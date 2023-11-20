from flask import Blueprint, render_template, request, session, redirect, url_for, flash
from DB_models.model import db, AutoBill, Admin, Quantity
from flask_login import login_user,login_required,logout_user
from forms import LoginForm
import telepot
from flask import jsonify

admin_bp = Blueprint('admin',
                     __name__,
                     url_prefix='/admin')


@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        admin = Admin.query.filter_by(email=form.email.data).first()

        if admin is None:
            form.email.errors.append('사용자 정보가 일치하지 않습니다.')
        elif not admin.check_password(admin.password, form.password.data):
            form.password.errors.append('사용자 정보가 일치하지 않습니다.')
        else:
            login_user(admin)
            flash('로그인!')

            next = request.args.get('next')
            if next == None or not next[0]=='/':
                next = url_for('admin.inventory')

            return redirect(next)
    return render_template('admin_login.html', form=form, errors=form.errors)



@admin_bp.route('/inventory')
@login_required
def inventory():
    items = Quantity.query.all()  # Quantity 모델의 모든 품목 데이터를 가져옴
    return render_template('admin_inventory.html', items=items)  # 품목 데이터를 템플릿에 전달

    
    
@admin_bp.route('/logout', methods=['POST', 'GET'])
@login_required
def logout():
    logout_user()
    flash('로그아웃!')
    return redirect(url_for('shopping.main'))


@admin_bp.route('/call', methods=['GET','POST'])
def call():
    try:
        tocken = '6700772575:AAH0gBVm9AUZWvXkJKGrvpOVd0qrTDvlvAo'
        me = '6752108248'
        bot = telepot.Bot(tocken)
        bot.sendMessage(me, '관리자 호출!')
        return jsonify(message='관리자를 호출했습니다!')
    except Exception as e:
        return jsonify(error=str(e)), 500