$(function() {
    var bill = {
        price_unit: 0,
        price_total: 0,
        ticket_discount: 0,
        cash_discount: 0,
        ticket_ok: true,
        cash_ok: true,
        payment: 0
    }

    $.get("/plan/ajax_check", function(data){
        if (data.status === 1) {
            $('#order').css('display', 'block'); 
            getRebateAccount();
        } else {
            $('#login').css('display', 'block');
            $("#login-form").submit(function() {
                var self = $('#local-login');
                var email = $("#user").val();
                var password = $("#passwd").val();
                if (email === "" || password === "") {
                    $(".login-info").text("请输入用户名和密码");
                    return false;
                } else {
                    self.text('登陆中...');
                    $.post("/login/ajax_check", {
                            "email": email,
                            "password": password
                        },
                        function(data) {
                            //IBBDtips.create( data.msg );
                            if (data.status == 1) {
                                self.text("登录成功");
                                $('#login').css('display', 'none');
                                $('#order').css('display', 'block');
                                getRebateAccount();
                            } else {
                                self.text('登陆');
                                $(".login-info").text(data.msg);
                                $("#passwd").val("");
                                $("#user").val("").focus();
                            }
                        }, "json"
                    );
                }
                return false;
            }); 
        }  
    }, 'json');

    

    $('#slide .close').click(function() {
        $('#slide').css('display', 'none');
        $('.transparent').css('display', 'none');
    });

    $('.apply').click(function() {
        var self = $(this);
        var selected = $('.apply').index(self);
        var thisCombo = self.parent().parent().parent();
        $('#slide').slideDown(600);
        $('.transparent').css({
            'height': thisCombo.height() + 'px'
        });
        thisCombo.siblings('.combo-detail').find('.transparent').css({
            'display': 'block'
        });
        $('body, html').animate({
            scrollTop: self.offset().top
        }, 600);
        $('#combo-select option').removeAttr("selected");
        var tcSelect;
        if(selected==0)
            tcSelect = $(".tcImg.baseSeason");
        else if(selected==1)
            tcSelect = $(".tcImg.proSeason");
        $(".tcImg").removeClass("onAchive");
        tcSelect.addClass("onAchive");
        $("#combo-select").val(tcSelect.attr("tc"));
        comboSelectChange();
    });

    $(".tcImg").click(function(){
        $(".tcImg").removeClass("onAchive");
        $(this).addClass("onAchive");
        $("#combo-select").val($(this).attr("tc"));
        comboSelectChange();
    })

    $('#combo-select').change(comboSelectChange);

    function comboSelectChange() {
        var combos = {
            basic_monthly: 58,
            basic_quarterly: 150,
            basic_yearly: 580,
            pro_monthly: 168,
            pro_quarterly: 450,
            pro_yearly: 1680
        };
        var self = $('#combo-select');
        var combo = self.val();
        var count = parseInt($('#combo-count').val());
        var selected = Math.floor((self.find('option:selected').index()) / 3) + 1;
        var transparent = $('.transparent');
        var sum = 0;
        transparent.css({
            'display': 'block'
        });
        $(transparent[selected]).css('display', 'none');
        sum = parseInt(combos[combo] * count);
        if (sum.toString() === 'NaN') {
            sum = 0;
        }
        $('#combo-price').text('￥' + parseInt(sum).toFixed(2));
        bill.price_unit = combos[combo];
        bill.price_total = sum;
        billCount();
        $("#selectBuyName").text(self.find("option:selected").text());
    }

    $('#combo-count').keyup(function() {
        var self = $(this);
        var count = parseInt(self.val());
        var sum = bill.price_unit * count;
        if (sum.toString() === 'NaN') {
            sum = 0;
        }
        $('#combo-price').text('￥' + sum.toFixed(2));
        bill.price_total = sum;
        billCount();
    });

    $(".btn-pay").click(function() {
        if (bill.ticket_ok === false || bill.cash_ok === false) {
            $('#buy-info').text('输入错误，请检查输入');
            return;
        };
        if((/^\d+$/).test($('#combo-count').val()) === true && parseInt($('#combo-count').val()) > 0){
            var self = $(this);
            var payWay = self.data('payway');
            var cash = bill.cash_discount;
                ticket = bill.ticket_discount,
                total = bill.price_total,
                payment = total - ticket - cash;
            self.text('提交中...');
            if(payment < 0) {
                if(total <= ticket){
                    ticket = Math.ceil(total / 20) * 20;
                    cash = 0;
                } else {
                    cash = total - ticket;
                }
                payment = 0;
            }
            var newWindow = window.open();
            $.post('/' + payWay + '/ajax_pay_form', {
                'select-package': $('#combo-select').find('option:selected').val(),
                'input-quantity': $("#combo-count").val(),
                'ticket': ticket,
                'cash': cash
            }, function(result) {
                if (result.code == 1) {
                    $('#out-trade-no').val(result.out_trade_no);
                    newWindow.location = result.pay_link;
                    $('#alipay-frame').show();
                } else if (result.code == 0) {
                    window.location.href = result.url;
                } else {
                    $('#buy-info').text(result.msg);
                }
            }, "json").fail(function() {
                self.text('去支付宝支付');
            });
        } else {
            $('#buy-info').text('购买数量必须为正整数');
            return;         
        }
    });

    

    function getRebateAccount(){
        $.get('/rebates/ajax_get_list', function(result){
            $('#ticket-value').text(result.ticket_value);
            $('#ticket-limit').text('（剩余' + result.ticket_count + '张，最多使用5张）');
            $('#cash-limit').text('（账户余额' + parseInt(result.balance).toFixed(2) + '元）');
            $('#ticket-quantity').keyup(function(){
                var self = $(this);
                var reg = /^\d+$/;
                var input = self.val();
                if (reg.test(input)) {
                    input = parseInt(input);
                    if(input >= 0 && input <= result.ticket_count && input <= 5){
                        bill.ticket_ok = true;
                        $('#ticket-limit').removeClass('texts-warning');
                    } else {
                        bill.ticket_ok = false;
                        $('#ticket-limit').addClass('texts-warning');
                    }
                    input = (input <= result.ticket_count) ? input : result.ticket_count;
                    if (0 <= input && input <= 5) {
                        $('#ticket-discount').text('-￥' + (input * 20).toFixed(2));
                    } else if (input < 0){
                        $('#ticket-discount').text('-￥0.00');
                        input = 0;
                    } else {
                        $('#ticket-discount').text('-￥100.00');
                        input = 5;
                    };
                } else if (input == '') {
                    input = 0;
                    bill.ticket_ok = true;
                    $('#ticket-limit').removeClass('texts-warning');
                    $('#ticket-discount').text('-￥0.00');
                } else {
                    $('#ticket-discount').text('-￥0.00');
                    input = 0;
                };
                bill.ticket_discount = input * 20;
                billCount();
            }).trigger('keyup');
            $('#cash-input').keyup(function(){
                var self = $(this);
                if (self.val() != '') {
                    var input = parseFloat(self.val());
                    if (input.toString() !== 'NaN' && input >= 0 && input <= result.balance) {
                        bill.cash_ok = true;
                    } else {
                        bill.cash_ok = false;
                    };
                    if (0 <= input && input <= result.balance) {
                        $('#cash-limit').removeClass('texts-warning');
                    } else if (input > result.balance) {
                        input = result.balance;
                        $('#cash-limit').addClass('texts-warning');
                    } else {
                        input = 0;
                        $('#cash-limit').removeClass('texts-warning');
                    }
                } else {
                    input = 0;
                    bill.cash_ok = true;
                    $('#cash-limit').removeClass('texts-warning');
                };
                $('#cash-discount').text('-￥' + input.toFixed(2));
                bill.cash_discount = input;
                billCount();
            }).trigger('keyup');

        }, 'json'); 
    }

    function billCount(){
        bill.payment = bill.price_total - bill.ticket_discount - bill.cash_discount;
        if(bill.payment < 0) {
            // if(bill.price_total <= bill.ticket_discount){
            //  bill.ticket_discount = Math.ceil(bill.price_total / 20) * 20;
            // } else {
            //  bill.cash_discount = bill.price_total - bill.ticket_discount;
            // }
            bill.payment = 0;
        }
        $('#final-bill').text('￥' + (bill.payment).toFixed(2));
        $('#buy-info').text('');
    }

    $('#alipay-success').on('click', function() {
        $.ajax({
            url: '/alipay/ajax_alipay_status',
            type: 'get',
            dataType: 'json',
            data: {'out_trade_no': $('#out-trade-no').val()},
            success: function(data) {
                if (data.success == true) {
                    window.location.href = data.url;
                } else {
                    window.location.href = data.url;
                }
            }
        });
    });

    $('#alipay-fail').on('click', function() {
        $('#alipay-frame').hide();
    });
});