"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeBid = exports.ViewProduct = exports.createCategories = exports.getCategory = exports.addProduct = void 0;
const Product_1 = __importDefault(require("../model/Product"));
const Category_1 = __importDefault(require("../model/Category"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_Id = req.body.userId;
        console.log("adddfdf  " + user_Id);
        const { productname, desc, baseprice, address } = req.body;
        let productDetails = yield Product_1.default.create({
            productname: productname,
            desc: desc,
            baseprice: baseprice,
            user_id: user_Id,
            address: address
        });
        res.send(productDetails);
    }
    catch (e) {
        res.send(e);
    }
});
exports.addProduct = addProduct;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Category_1.default.findAll();
        res.json(result);
    }
    catch (err) {
        console.log(err);
        throw new Error("Error");
    }
});
exports.getCategory = getCategory;
//----------------category
const createCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_Id = req.body.userId;
        console.log("adddfdf  " + user_Id);
        const { category_name, parent_id } = req.body;
        let categories = yield Category_1.default.create({
            category_name,
            parent_id
        });
        res.send(categories);
        console.log('Categories and sub-categories added to the database.');
    }
    catch (error) {
        console.error('Error creating categories and sub-categories:', error);
    }
});
exports.createCategories = createCategories;
const ViewProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Product_1.default.findAll();
        res.json(result);
    }
    catch (err) {
        console.log(err);
        throw new Error("Error");
    }
});
exports.ViewProduct = ViewProduct;
const placeBid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bid_value, product_id, userId } = req.body;
        const isBidder = yield Product_1.default.findOne({ where: { product_id } });
        if (isBidder) {
            if (isBidder.user_id == userId) {
                res.send("Sorry, you cannot bid on your own uploaded product");
            }
            else {
                isBidder.bid_value = bid_value;
                isBidder.bidder_id = userId;
                isBidder.cur_price = parseInt(bid_value) + isBidder.baseprice;
                yield isBidder.save();
                res.status(200).send("Product price updated");
            }
        }
        else {
            res.send("Product not available");
        }
    }
    catch (e) {
        res.status(400).send(e);
    }
});
exports.placeBid = placeBid;
