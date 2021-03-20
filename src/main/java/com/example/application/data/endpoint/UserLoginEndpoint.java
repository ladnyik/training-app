package com.example.application.data.endpoint;

import com.example.application.data.entity.UserInfo;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;
import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

@Endpoint
@AnonymousAllowed
public class UserLoginEndpoint{

	public void userLogin(UserInfo userInfo) {
		MongoClient mongoClient = new MongoClient("localhost", 27017);
		DB database = mongoClient.getDB("myMongoDb");
		database.createCollection("users", null);
		DBCollection collection = database.getCollection("users");
		BasicDBObject document = new BasicDBObject();
		document.put("email", userInfo.getEmail());
		document.put("displaylName", userInfo.getDisplayName());
		document.put("photoURL", userInfo.getPhotoURL());
		collection.insert(document);
	}
	
}
