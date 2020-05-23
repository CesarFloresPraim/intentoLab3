package com.example.controller;

import java.util.List;
import java.util.Optional;

import javax.annotation.Resource;
import javax.validation.Valid;
import javax.validation.constraints.PositiveOrZero;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Ioption;
import com.example.exception.BookNotFoundException;
import com.example.repository.OptionRepository;

@RestController
public class OptionController {
	
	@Resource
	private OptionRepository optionRepository;
	
	@GetMapping("/getOptions")
	public List<Ioption> getOptions() {
		List<Ioption> options = optionRepository.findAll();
		return options;
	}
	
	@GetMapping("/getOption/{0}")
	public Ioption getOption(@PathVariable(value = "id")
						@PositiveOrZero(message = "Id must be greater or equal to 0") Long id) {
		Optional<Ioption> option = optionRepository.findById(id);
		if (option.isPresent()) {
			return option.get();
		} else {
			throw new BookNotFoundException("Book not found with id " + id);
		}
	}
	
	@PostMapping("/option")
	public Ioption newOption(@Valid @RequestBody Ioption newOption) {
		return optionRepository.save(newOption);
	}
}

