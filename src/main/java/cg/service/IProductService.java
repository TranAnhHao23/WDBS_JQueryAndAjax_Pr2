package cg.service;

import cg.model.Category;
import cg.model.Product;

public interface IProductService {
    Iterable<Product> findAll();

    Product findById(Long id);

    void deleteById(Long id);

    Product save(Product product);

    Iterable<Product> findAllByNameContaining(String name);

    Iterable<Product> findAllByPriceBetween(double firstPrice, double secondPrice);

    Iterable<Product> findAllByCategory(Category category);

    Iterable<Product> findAllByNameContainingAndPriceBetweenAndCategory(String name, double firstPrice, double secondPrice, Category category);

    Iterable<Product> findAllByNameContainingAndPriceBetween(String name, double firstPrice, double secondPrice);

    Iterable<Product> deleteAllByCategory(Category category);


}
