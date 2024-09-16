package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {
    List<Role> findAll();
    Role findById(long id);
    Role saveRole(Role role);
    Role findByName(String name);
    Set<Role> findAllById(List<Long> ids);

}