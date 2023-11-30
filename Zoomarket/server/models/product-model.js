const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Product = sequelize.define( 'product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image: {type: DataTypes.STRING, defaultValue: '/no-image.png'},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    end_date: {type: DataTypes.DATE},
    create_date: {type: DataTypes.DATE},
    refresh_date: {type: DataTypes.DATE},
    price: {type: DataTypes.FLOAT},
    old_price: {type: DataTypes.FLOAT, allowNull: true},
    amount: {type: DataTypes.INTEGER, defaultValue: 0},
    hit: {type: DataTypes.BOOLEAN, defaultValue: false},
    sale: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
})



Category.hasOne(Product) //Категория
Product.belongsTo(Category)

module.exports = {
    Product,
    Category
}