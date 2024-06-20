package com.project.networktechnologiesproject.service.auth;

import com.project.networktechnologiesproject.infrastructure.auth.AuthEntity;
import com.project.networktechnologiesproject.infrastructure.auth.AuthRepository;

public abstract class OwnershipService {
    protected final AuthRepository authRepository;

    public OwnershipService(AuthRepository authRepository) {
        this.authRepository = authRepository;
    }

    public void deleteByUser_Id(Long userId){
        authRepository.deleteByUser_Id(userId);
    }

    public boolean isOwner(String username, Long userId){
        if(userId == null || username == null){
            return false;
        }

        AuthEntity authEntity = authRepository.findByUsername(username).orElseThrow();

        return userId == authEntity.getUser().getId();
    }
}
