package ru.kata.spring.boot_security.demo.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import ru.kata.spring.boot_security.demo.model.User;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    public void addViewControllers(ViewControllerRegistry registry) {

        registry.addViewController("/user").setViewName("user");
        registry.addViewController("/admin").setViewName("admin");
        registry.addViewController("/admin/new").setViewName("new");
        registry.addViewController("/admin/edit").setViewName("edit");
        registry.addViewController("login").setViewName("login");
    }
    @ModelAttribute("user")
    public User user() {
        return new User();
    }
}
