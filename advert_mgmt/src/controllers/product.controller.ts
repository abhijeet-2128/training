import { Request, Response } from "express";
import Product from "../model/Product";

export const addProduct = async (req: Request, res: Response) => {

    try {
        const userId = req.body.userId;
        console.log(userId);
        const { productname, desc, baseprice, address} = req.body;

        let productDetails = await Product.create({
            
            productname: productname,
            desc: desc,
            baseprice: baseprice,
            user_id: userId,
            address: address
        })



        res.send(productDetails);
    } catch (e) {

        res.send(e)
    }

}

// export const ViewProduct = async(req:Request, res:Response)=>{
//     try{

//     }catch(e){
        
//     }
// }



export const placeBid = async (req: Request, res: Response) => { //edge case of same user putting bid needs to be solved
    try {
        const userId = req.body.user_id;
        const { bid_value, product_id} = req.body;
        const isBidder = await Product.findOne({where:{product_id}});
    
        if(isBidder)
        {
            if(isBidder.user_id== product_id)
            {
                res.send("Sorry..!!! Uploader of product cannot bid on their own uploaded product")
            }
            isBidder.bidder_id= userId,
            isBidder.bid_value=bid_value
            
            await isBidder.save();
            res.status(200).send("Product price updated" )

        }
        else{
            res.send("product not available");
        }
  

    } catch (e) {
        res.status(400).send(e)
    }
}
