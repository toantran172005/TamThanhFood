package iuh.fit.service;

import iuh.fit.TTUtil.ConvertData;
import iuh.fit.entity.DTO.VoucherDTO;
import iuh.fit.entity.Voucher;
import iuh.fit.repository.VoucherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VoucherService {

    final VoucherRepository voucherRepository;
    final ConvertData convertData;

    public List<VoucherDTO> getAllVouchers() {
        List<Voucher> list = voucherRepository.findAll();
        return list.stream().map(convertData::convertVoucherToVoucherDTO).toList();
    }

}
