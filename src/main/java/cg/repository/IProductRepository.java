package cg.repository;

import cg.model.Category;
import cg.model.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductRepository extends CrudRepository<Product,Long> {
    Iterable<Product> findAllByNameContaining(String name);

    Iterable<Product> findAllByPriceBetween(double firstPrice, double secondPrice);

    Iterable<Product> findAllByCategory(Category category);

    Iterable<Product> findAllByNameContainingAndPriceBetweenAndCategory(String name, double firstPrice, double secondPrice, Category category);

    Iterable<Product> findAllByNameContainingAndPriceBetween(String name, double firstPrice, double secondPrice);

}
