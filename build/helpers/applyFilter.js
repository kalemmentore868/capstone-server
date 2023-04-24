"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFilters = void 0;
function applyFilters(products, _a) {
    var query = _a.query, sort = _a.sort, category_id = _a.category_id;
    var filteredProducts = [];
    for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
        var product = products_1[_i];
        if (query && !product.title.toLowerCase().includes(query.toLowerCase())) {
            continue;
        }
        filteredProducts.push(product);
    }
    var sortedProducts = filteredProducts.sort(function (a, b) {
        switch (sort) {
            case "price- high to low":
                return b.price - a.price;
            case "price- low to high":
                return a.price - b.price;
            case "newest arrivals":
                return b.created_at.getTime() - a.created_at.getTime();
            case "popularity":
                return Number(b.is_best_seller) - Number(a.is_best_seller);
            default:
                return a.title.localeCompare(b.title);
        }
    });
    var categorized_products = [];
    if (category_id) {
        var categoryId = parseInt(category_id);
        for (var _b = 0, sortedProducts_1 = sortedProducts; _b < sortedProducts_1.length; _b++) {
            var product = sortedProducts_1[_b];
            if (product.category_id === categoryId) {
                categorized_products.push(product);
            }
        }
        return categorized_products;
    }
    return sortedProducts;
}
exports.applyFilters = applyFilters;
