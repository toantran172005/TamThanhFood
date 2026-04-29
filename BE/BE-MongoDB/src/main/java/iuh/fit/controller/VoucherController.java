package iuh.fit.controller;

import iuh.fit.entity.DTO.VoucherDTO;
import iuh.fit.service.VoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/vouchers")
@RequiredArgsConstructor
public class VoucherController {

    final VoucherService voucherService;

    @GetMapping("/")
    public ResponseEntity<List<VoucherDTO>> getAllVouchers() {
        List<VoucherDTO> dtoList = voucherService.getAllVouchers();
        return new ResponseEntity<>(dtoList, HttpStatus.OK);
    }

}
