package com.example.application.listener;

import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import com.example.application.parms.AppStore;

import de.flapdoodle.embed.mongo.MongodExecutable;
import de.flapdoodle.embed.mongo.MongodProcess;
import de.flapdoodle.embed.mongo.MongodStarter;
import de.flapdoodle.embed.mongo.config.MongodConfig;
import de.flapdoodle.embed.mongo.config.Net;
import de.flapdoodle.embed.mongo.config.Storage;
import de.flapdoodle.embed.mongo.distribution.Version;
import de.flapdoodle.embed.process.runtime.Network;

@Component
@PropertySource("classpath:application.properties")
@WebListener
public class WebAppListener implements ServletContextListener {

	@Value("${mongo.db.location}")
	private String mongodblocation;

	private static MongodExecutable mongodExecutable = null;

	@Override
	public void contextInitialized(ServletContextEvent sce) {
		
		System.out.println("My Vaadin web app is starting.");
		if (mongodExecutable != null) {
			System.out.println("bazdmeg mar megint");
			return;
		}
		System.out.println("local " + mongodblocation);
		ServletContext sc = sce.getServletContext();
		if (sc.getInitParameter("mongo.db.location") != null )
			mongodblocation = sc.getInitParameter("mongo.db.location");
		else
			System.out.println("it was null init parameter");
		if ( mongodblocation == null) {
			System.out.println("it was null");
			mongodblocation = "/home/ladnyik/.mondodb";
		}
			
		System.out.println("final " + mongodblocation);

		MongodStarter starter = MongodStarter.getDefaultInstance();
		int port;		
		try {
			port = 27017;
			AppStore.setMongoPort(port);
			Storage storage = new Storage(mongodblocation, null, 0);
			MongodConfig mongodConfig = MongodConfig.builder().version(Version.Main.PRODUCTION).net(new Net(port, Network.localhostIsIPv6())).replication(storage).build();
			mongodExecutable = starter.prepare(mongodConfig);
			MongodProcess mongod = mongodExecutable.start();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		System.out.println("My Vaadin web app is shutting down.");
		if (mongodExecutable != null)
			mongodExecutable.stop();
	}
}