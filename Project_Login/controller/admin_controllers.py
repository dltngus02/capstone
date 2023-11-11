from flask import Blueprint, render_template, request, session, redirect, url_for
from DB_models.model import db, AutoBill, Admin




admin_bp = Blueprint('admin',
                     __name__,
                     url_prefix='/admin')



@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        admin = Admin.query.get(request.form['admin_id'])
        if admin and admin.check_password(request.form['admin_pw']):
            session['logged_in'] = True
            return redirect(url_for('admin.inventory'))
        else:
            return 'Wrong ID or Password!'
    else:
        return render_template('admin_login.html')


@admin_bp.route('/inventory')
def inventory():
    if not session.get('logged_in'):
        return redirect(url_for('admin.login'))
    else:
        items = AutoBill.query.all()  # AutoBill 모델의 모든 품목 데이터를 가져옴
        # print(items)
        return render_template('admin_inventory.html', items=items)  # 품목 데이터를 템플릿에 전달
    
    
@admin_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('shopping.main'))