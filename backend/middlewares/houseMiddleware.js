import { House } from "../model/index.js";

const getHouseById = async (req, res, next) => {
    try {
        const houseId = req.params.houseId;
        const userId = req.user.id;

        const house = await House.findOne({where: {id: houseId, userId: userId}});
        if (!house) return res.status(404).json({ error: "House not found." });

        req.house = house;

        next();
    } catch (err) {
        console.log(err);

        res.status(500).json({error: 'Could not get house.'});
    }
    
};

export { getHouseById };
