package dev.sch39.ecommerce_frontend.controllers.user;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/sales-transaction")
public class SalesTransactionController {
  @GetMapping({ "", "/" })
  public String index(Model model) {
    return "page/user/salestransaction/index";
  }

}
