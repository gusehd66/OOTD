const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");
const { getRegExp } = require("korean-regexp");

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  // 가져온 이미지 저장
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/", (req, res) => {
  // 받아온 정보들을 DB에 넣어 준다.
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

router.post("/products", async (req, res) => {
  // product collection 상품 정보 가져오기
  const limit = req.body.limit ? parseInt(req.body.limit) : 20;
  const skip = req.body.skip ? parseInt(req.body.skip) : 0;
  const term = req.body.searchTerm;
  const user = req.body.user;

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          //크거나 같은
          $gte: req.body.filters[key][0],
          // 작거나 같은
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  if (term) {
    const reg = getRegExp(`${term}`, { startsWith: true });
    Product.find({ writer: user })
      .find({ title: reg })
      // .find({ $text: { $search: reg } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  } else {
    Product.find({ writer: user })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  }
});

router.post("/products_select", async (req, res) => {
  // product collection 상품 정보 가져오기
  const user = req.body.user;

  let findArgs = { writer: user };

  Product.find(findArgs)
    .populate("writer")
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res
        .status(200)
        .json({ success: true, productInfo, postSize: productInfo.length });
    });
});

router.get("/products_by_id", (req, res) => {
  const type = req.query.type;
  const productId = req.query.id;

  //productId를 이용해서 DB에서 정보를 가져오기
  Product.find({ _id: productId })
    .populate("writer")
    .exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, product });
    });
});

router.get("/delete", (req, res) => {
  const productId = req.query.id;

  //productId를 이용해서 DB에서 정보를 가져오기
  Product.deleteOne({ _id: productId }).exec((err, product) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send({ success: true, product });
  });
});

module.exports = router;
