package com.example.response;

public class LoginResponse {

	private long id;
	private String username;
	
	public LoginResponse() {
		
	}
	
	public LoginResponse(final long id, final String username) {
		this.id = id;
		this.username = username;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
