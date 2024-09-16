package ru.kata.spring.boot_security.demo.configs;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.service.RoleService;


import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class DataInitializer {

    private final UserService userService;
    private final RoleService roleService;




    @Autowired
    public DataInitializer(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;


    }

    @PostConstruct
    public void init() {
        Role roleAdmin = roleService.findByName("ROLE_ADMIN");
        if (roleAdmin == null) {
            roleAdmin = new Role("ROLE_ADMIN");
            roleService.saveRole(roleAdmin);

        }

        Role roleUser = roleService.findByName("ROLE_USER");
        if (roleUser == null) {
            roleUser = new Role("ROLE_USER");
            roleService.saveRole(roleUser);

        }


        User admin = userService.findByEmail("admin@example.com");
        if (admin == null) {
            admin = new User("admin@example.com", "admin", "Admin", "Admin", 40, Set.of(roleAdmin));
            userService.saveUser(admin);

        }

        User user = userService.findByEmail("user@example.com");
        if (user == null) {
            user = new User("user@example.com", "user", "User", "User", 40, Set.of(roleUser));
            userService.saveUser(user);

        }
    }
}