package cg.controller;

import cg.model.Category;
import cg.model.Product;
import cg.service.ICategoryService;
import cg.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin("*")
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private IProductService productService;

    @Autowired
    private ICategoryService categoryService;

    @GetMapping
    public ResponseEntity<Iterable<Product>> showAll() {
        Iterable<Product> products = productService.findAll();
        if (!products.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> showDetail(@PathVariable("id") Long id) {
        Product product = productService.findById(id);
        if (product == null) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> editProduct(@PathVariable("id") Long id, @RequestBody Product product) {
        Product product1 = productService.findById(id);
        if (product1 == null) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        product.setId(id);
        productService.save(product);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        productService.save(product);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable("id") Long id) {
        Product product = productService.findById(id);
        if (product == null) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.deleteById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Iterable<Product>> findByNameContaining(@RequestParam("search") String search) {
        Iterable<Product> products = productService.findAllByNameContaining(search);
        if (!products.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/searchFull")
    public ResponseEntity<Iterable<Product>> findByAll(@RequestParam("search") String search, @RequestParam("firstPrice") String firstPrice, @RequestParam("secondPrice") String secondPrice, @RequestParam("idCategory") Long idCategory) {
        Iterable<Product> products;
        Iterable<Product> productsState = productService.findAll();
        double max = 0, min = 0;
        for (Product product : productsState) {
            if (product.getPrice() < min) {
                min = product.getPrice();
            }
            if (product.getPrice() > max) {
                max = product.getPrice();
            }
        }

        if (firstPrice.equals("")) {
            firstPrice = String.valueOf(min);
        }
        if (secondPrice.equals("")) {
            secondPrice = String.valueOf(max);
        }

        if (idCategory == 0) {
            products = productService.findAllByNameContainingAndPriceBetween(search, Double.parseDouble(firstPrice), Double.parseDouble(secondPrice));
        } else {
            Category category = categoryService.findById(idCategory);
            products = productService.findAllByNameContainingAndPriceBetweenAndCategory(search, Double.parseDouble(firstPrice), Double.parseDouble(secondPrice), category);
        }

        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
