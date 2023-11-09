from flask import Blueprint, render_template, request, session, redirect, url_for, flash
from DB_models.model import db, AutoBill, Admin
from flask_login import login_user,login_required,logout_user
from forms import LoginForm
import telepot
from flask import jsonify

admin_bp = Blueprint('admin',
                     __name__,
                     url_prefix='/admin')



# @admin_bp.route('/login', methods=['GET', 'POST'])
# def login():
#     if request.method == 'POST':
#         admin = Admin.query.get(request.form['admin_id'])
#         if admin and admin.check_password(request.form['admin_pw']):
#             session['logged_in'] = True
#             return redirect(url_for('admin.inventory'))
#         else:
#             return 'Wrong ID or Password!'
#     else:
#         return render_template('admin_login.html')


@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        admin = Admin.query.filter_by(email=form.email.data).first()

        if admin is not None and admin.check_password(admin.password, form.password.data):
            login_user(admin)
            flash('로그인!')

            next = request.args.get('next')
            # 만약 로그인이 필요한 페이지를 사용자가 방문하려고 한다면 next로 저장
            # 로그인을 하지 않은 사용자가 welcome_user에 액세스하는 경우 Flask는 해당 페이지에 대한 요청을 
            # next 페이지로 저장후 LoginForm으로 리디렉션

            if next == None or not next[0]=='/':
                next = url_for('admin.inventory')
                
            # 만약 정상적으로 로그인한 상태였다면 사용자가 가려고 했던 next 페이지를 요청
            # next 페이지에 아무것도 없을 떄(로그인한 상태니까 next에 쌓인 요청이 없음)
            # inventory_user

            return redirect(next)
    return render_template('admin_login.html', form=form, errors=form.errors)



@admin_bp.route('/inventory')
@login_required
def inventory():
    items = AutoBill.query.all()  # AutoBill 모델의 모든 품목 데이터를 가져옴
    return render_template('admin_inventory.html', items=items)  # 품목 데이터를 템플릿에 전달
    
    
@admin_bp.route('/logout', methods=['POST', 'GET'])
@login_required
def logout():
    logout_user()
    flash('로그아웃!')
    return redirect(url_for('shopping.main'))



@admin_bp.route('/call')
def call():
    tocken = '6517401179:AAFzWjz8UMlmBvwae95yoPHc80Qx95KX0Hc'
    me = '6565353003'
    bot = telepot.Bot(tocken)
    bot.sendMessage(me, '관리자 호출!')
    return jsonify(message='관리자를 호출했습니다!')