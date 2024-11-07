package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.service.RoleService;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleRestController {

    private final RoleService roleService;

    @Autowired
    public RoleRestController(RoleService roleService) {
        this.roleService = roleService;
    }


    @GetMapping
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = roleService.findAll();
        return ResponseEntity.ok(roles);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable Long id) {
        Role role = roleService.findById(id);
        if (role != null) {
            return ResponseEntity.ok(role);
        }
        return ResponseEntity.notFound().build();
    }


    @PostMapping
    public ResponseEntity<Role> createRole(@RequestBody Role role) {
        roleService.saveRole(role);
        return ResponseEntity.ok(role);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Role> updateRole(@PathVariable Long id, @RequestBody Role updatedRole) {
        Role role = roleService.findById(id);
        if (role != null) {
            updatedRole.setId(id);
            roleService.saveRole(updatedRole);
            return ResponseEntity.ok(updatedRole);
        }
        return ResponseEntity.notFound().build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
        Role role = roleService.findById(id);
        if (role != null) {
            roleService.saveRole(role);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}