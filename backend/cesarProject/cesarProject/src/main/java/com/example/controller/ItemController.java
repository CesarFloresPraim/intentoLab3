package com.example.controller;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.annotation.Resource;
import javax.validation.Valid;
import javax.validation.constraints.PositiveOrZero;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Item;
import com.example.entity.Ioption;
import com.example.exception.BookNotFoundException;
import com.example.repository.ItemRepository;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ItemController {
	
	@Resource
	private ItemRepository itemRepository;
	
	@GetMapping("/getItems")
	public ResponseEntity<Object> getItems() {
		List<Item> items = itemRepository.findAll(); 
        return new ResponseEntity<Object>(items, HttpStatus.OK);
	}
	
	@GetMapping("/getItem/{id}")
	public Item getItem(@PathVariable(value = "id")
						@PositiveOrZero(message = "Id must be greater or equal to 0") Long id) {
		Optional<Item> item = itemRepository.findById(id);
		if (item.isPresent()) {
			return item.get();
		} else {
			throw new BookNotFoundException("Book not found with id " + id);
		}
	}
	
	@GetMapping("/getItemOptions/{id}")
	public ResponseEntity<Object> getItemOptions(@PathVariable(value = "id")
	@PositiveOrZero(message = "Id must be greater or equal to 0") Long id) {
		Item item = this.getItem(id);
		Set<Ioption> options = item.getOptions();
        return new ResponseEntity<Object>(options, HttpStatus.OK);
	}
	
	@PostMapping("/itemOption/{id}")
	public void newItemOption(@Valid @RequestBody Ioption option, @PathVariable(value = "id")
	@PositiveOrZero(message = "Id must be greater or equal to 0") Long id) {
		Item item = this.getItem(id);
		item.getOptions().add(option);
		itemRepository.save(item);
		
	}
	
	@PostMapping("/item")
	public Item newItem(@Valid @RequestBody Item newItem) {
		return itemRepository.save(newItem);
	}
}

