package com.example.application.data.endpoint;

import com.example.application.data.CrudEndpoint;
import com.example.application.data.entity.SampleAddress;
import com.example.application.data.service.SampleAddressService;
import com.vaadin.flow.server.connect.Endpoint;

import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
public class SampleAddressEndpoint extends CrudEndpoint<SampleAddress, Integer> {

    private SampleAddressService service;

    public SampleAddressEndpoint(@Autowired SampleAddressService service) {
        this.service = service;
    }

    @Override
    protected SampleAddressService getService() {
        return service;
    }

}
