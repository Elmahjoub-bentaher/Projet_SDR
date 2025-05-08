package com.FirstSpringBoot.project;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


@SpringBootTest
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
class ProjectApplicationTests {

	@Test
	void contextLoads() {
	}

}
