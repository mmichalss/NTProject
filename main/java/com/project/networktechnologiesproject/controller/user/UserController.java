package com.project.networktechnologiesproject.controller.user;

import com.project.networktechnologiesproject.controller.user.dto.GetUserDto;
import com.project.networktechnologiesproject.controller.user.dto.PatchUserDto;
import com.project.networktechnologiesproject.controller.user.dto.PatchUserResponseDto;
import com.project.networktechnologiesproject.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("api/users")
@PreAuthorize("hasRole('ADMIN')")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping
    List<GetUserDto> getAll(){
        return userService.getAll();
    }

    @GetMapping("/{id}")
    public GetUserDto getOne(@PathVariable long id) {
        return userService.getOne(id);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<GetUserDto> getMe(Principal principal){
        String username = principal.getName();
        GetUserDto userDto = userService.getUserByUsername(username);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<PatchUserResponseDto> update(@PathVariable long id, @RequestBody PatchUserDto dto){
        PatchUserResponseDto responseDto = userService.update(id, dto);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
}
