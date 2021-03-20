package com.example.application.parms;

public class AppStore {
	
	private static int mongoPort;

	public static int getMongoPort() {
		return mongoPort;
	}

	public static void setMongoPort(int mongoPort) {
		AppStore.mongoPort = mongoPort;
	}
	

}
