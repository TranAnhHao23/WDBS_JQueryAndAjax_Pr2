package cg.service.impl;

import cg.model.Category;
import cg.model.Product;
import cg.repository.IProductRepository;
import cg.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements IProductService {
    @Autowired
    private IProductRepository productRepository;

    @Override
    public Iterable<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product findById(Long id) {
        if (productRepository.findById(id).isPresent()){
            return productRepository.findById(id).get();
        }
        return null;
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Iterable<Product> findAllByNameContaining(String name) {
        return productRepository.findAllByNameContaining(name);
    }

    @Override
    public Iterable<Product> findAllByPriceBetween(double firstPrice, double secondPrice) {
        return productRepository.findAllByPriceBetween(firstPrice,secondPrice);
    }

    @Override
    public Iterable<Product> findAllByCategory(Category category) {
        return productRepository.findAllByCategory(category);
    }

    @Override
    public Iterable<Product> findAllByNameContainingAndPriceBetweenAndCategory(String name, double firstPrice, double secondPrice, Category category) {
        return productRepository.findAllByNameContainingAndPriceBetweenAndCategory(name,firstPrice,secondPrice,category);
    }

    @Override
    public Iterable<Product> findAllByNameContainingAndPriceBetween(String name, double firstPrice, double secondPrice) {
        return productRepository.findAllByNameContainingAndPriceBetween(name,firstPrice,secondPrice);
    }
}
