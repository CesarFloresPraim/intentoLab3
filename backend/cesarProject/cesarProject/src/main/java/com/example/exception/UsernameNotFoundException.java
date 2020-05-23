package com.example.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UsernameNotFoundException extends RuntimeException {
	private static final long serialVersionUID = 4094565207533805677L;

	public UsernameNotFoundException(final String message) {
		super(message);
	}
}