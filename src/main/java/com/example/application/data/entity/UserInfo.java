package com.example.application.data.entity;

public class UserInfo {
	
	private String email;
	private String displayName;
	private boolean emailVerified;
	private String photoURL;
	private String accessToken;
	
	public UserInfo() {
		super();
	}

	public UserInfo(String email, String displayName, boolean emailVerified, String photoURL, String accessToken) {
		super();
		this.email = email;
		this.displayName = displayName;
		this.emailVerified = emailVerified;
		this.photoURL = photoURL;
		this.accessToken = accessToken;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public boolean isEmailVerified() {
		return emailVerified;
	}

	public void setEmailVerified(boolean emailVerified) {
		this.emailVerified = emailVerified;
	}

	public String getPhotoURL() {
		return photoURL;
	}

	public void setPhotoURL(String photoURL) {
		this.photoURL = photoURL;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return String.format("%s %s %s %b %s", this.email, this.photoURL, this.getDisplayName(), this.isEmailVerified(),this.getAccessToken() );
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	
}
