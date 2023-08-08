import { Request, Response } from "express";
import Product from "../model/Product";
import Category from '../model/Category';
import { Op, QueryTypes } from "sequelize";
import sequelize from "../db/connect";
export const addProduct = async (req: Request, res: Response) => {

    try {
      
        
        const user_Id = req.body.userId;
        console.log("adddfdf  " + user_Id);
        const { productname, desc, baseprice, address} = req.body;

        let productDetails = await Product.create({
            
            productname: productname,
            desc: desc,
            baseprice: baseprice,
            user_id: user_Id,
            address: address
        })



        res.send(productDetails);
    } catch (e) {

        res.send(e)
    }

}

export const filterProduct=async(req:Request,res:Response)=>{

  const minPrice = parseInt(req.query.min_price as string);
  const maxPrice = parseInt(req.query.max_price as string);

  console.log(minPrice);

  try {
    const filteredProducts = await Product.findAll({
      where: {
        base_price: {
          [Op.between]: [minPrice, maxPrice],
        },
      },
    });

    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }

}


export const getCategory = async (req: Request, res: Response)=> {
  try {
    const result = await Category.findAll(); 
    res.json(result);
} catch (err) {
    console.log(err);
    throw new Error("Error");
} 
}



//----------------category
export const createCategories= async(req :Request, res:Response) => {
      try {
        const user_Id = req.body.userId;
        console.log("adddfdf  " + user_Id);
        const { category_name ,parent_id} = req.body;

        let categories = await Category.create({
            
            category_name,
            parent_id
        })



        res.send(categories);
      
    
        console.log('Categories and sub-categories added to the database.');
      } catch (error) {
        console.error('Error creating categories and sub-categories:', error);
      }
    }
    







export const ViewProduct = async(req:Request, res:Response)=>{
  try {
    const result = await Product.findAll(); 
    res.json(result);
} catch (err) {
    console.log(err);
    throw new Error("Error");
} 
}





export const placeBid = async (req: Request, res: Response) => {
    try {
      const { bid_value, product_id, userId } = req.body;
      const isBidder = await Product.findOne({ where: { product_id } });
  
      if (isBidder) {
        if (isBidder.user_id == userId) {
          res.send("Sorry, you cannot bid on your own uploaded product");
        } else {
          isBidder.bid_value = bid_value;
          isBidder.bidder_id = userId;
          isBidder.cur_price = parseInt(bid_value) + isBidder.baseprice;
          await isBidder.save();
          res.status(200).send("Product price updated");
        }
      } else {
        res.send("Product not available");
      }
    } catch (e) {
      res.status(400).send(e);
    }
  };