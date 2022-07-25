import MCategory from "./Category";
import MArticle from "./Article";
import MClient from "./Client";
import MIngreso from "./Ingreso";
import MVenta from "./Venta";
import MUser from './User'
import MProveedor from './Proveedor';

const Category = MCategory.Category;
const User = MUser.User;
const Article = MArticle.Article;
const Client = MClient.Client;
const Proveedor = MProveedor.Proveedor;
const Ingreso = MIngreso.Ingreso;
const Venta = MVenta.Venta;

export default {
    Category,
    Article,
    User,
    Client,
    Proveedor,
    Ingreso,
    Venta

}