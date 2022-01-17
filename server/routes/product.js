const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const { Product } = require("../models/Product");
const { getRegExp } = require("korean-regexp");

//=================================
//             Product
//=================================

const config = require("../config/key");
const s3 = new aws.S3({
  accessKeyId: config.s3_access_key,
  secretAccessKey: config.s3_secretaccess_key,
  region: config.s3_bucket_region,
});

const storage = multerS3({
  s3: s3,
  bucket: "ootd-picture",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  ACL: "public-read",
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `uploads/${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return req.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.location,
      fileKey: res.req.file.key,
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

  let findArgs = { writer: user };

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
    Product.find(findArgs)
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
    Product.find(findArgs)
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

router.post("/update", async (req, res) => {
  const productId = req.query.id;
  Product.replaceOne({ _id: productId }, { ...req.body }).exec(
    (err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, product });
    }
  );
});

router.post("/delete", (req, res) => {
  const productId = req.query.id;
  s3.deleteObject(
    {
      Bucket: "ootd-picture", // 사용자 버켓 이름
      Key: req.body.key, // 버켓 내 경로
    },
    (err, data) => {
      if (err) {
        throw err;
      }
    }
  );
  //productId를 이용해서 DB에서 정보를 가져오기
  productId &&
    Product.deleteOne({ _id: productId }).exec((err, product) => {
      if (err) return res.status(400).send(err);
      return res.status(200).send({ success: true, product });
    });
});

module.exports = router;
