package cg.controller;

import cg.model.Category;
import cg.service.ICategoryService;
import cg.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;

    @Autowired
    private IProductService productService;

    @GetMapping
    public ResponseEntity<Iterable<Category>> showAllCategory() {
        Iterable<Category> categories = categoryService.findAll();
        if (!categories.iterator().hasNext()) {
            new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> showDetailCategory(@PathVariable("id") Long id) {
        Category category = categoryService.findById(id);
        if (category == null) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        categoryService.save(category);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @DeleteMapping("/{idCategory}")
    public ResponseEntity<Category> deleteCategory(@PathVariable("idCategory") Long id) {
        Category category = categoryService.findById(id);
        if (category == null) {
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            productService.deleteAllByCategory(category);
            categoryService.deleteById(id);
        }
        return new ResponseEntity<>(category, HttpStatus.OK);
    }
}
