import os
from flask import Flask, render_template, redirect, url_for, flash, request, Blueprint
from flask_login import LoginManager, login_user, logout_user, UserMixin, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email, Length
from dotenv import load_dotenv
from datetime import datetime
from flask_mail import Mail, Message
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

app = Flask(__name__)

# Mail Configuration
app.config['MAIL_SERVER'] = 'kmat.adebisi@gmail.com'
app.config['MAIL_PORT'] = 587  
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.getenv('EMAIL_PASS')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('EMAIL_USER')

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = os.getenv('SECRET_KEY', 'supersecretkey')

db = SQLAlchemy(app)
mail = Mail(app)

class ContactMessage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

with app.app_context():
    db.create_all()

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth.login'

users = {}

class User(UserMixin):
    def __init__(self, id):
        self.id = id

    @staticmethod
    def get(user_id):
        return User(user_id) if user_id in users else None

@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

# Auth Blueprint
auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        stored_password = users.get(username)
        if stored_password and check_password_hash(stored_password, password):
            login_user(User(username))
            flash('Login successful!', 'success')
            return redirect(url_for('main.home'))
        flash('Invalid credentials, please try again.', 'error')
    return render_template('main/login.html')

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users:
            flash('Username already exists, please choose another one.', 'error')
        else:
            users[username] = generate_password_hash(password)
            flash('Registration successful! Please login.', 'success')
            return redirect(url_for('auth.login'))
    return render_template('main/register.html')

@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    flash('You have been logged out.', 'success')
    return redirect(url_for('auth.login'))

app.register_blueprint(auth_bp)

# Main Blueprint
main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def home():
    return render_template('main/index.html')

@main_bp.route('/spin')
def spin():
    return render_template('main/spin.html')

@main_bp.route('/projects')
def projects():
    return render_template('main/projects.html')

# Contact Form Handling
class ContactForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=2, max=100)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    message = TextAreaField('Message', validators=[DataRequired(), Length(min=10, max=1600)])
    submit = SubmitField('Send Message')

@main_bp.route('/contact', methods=['GET', 'POST'])
def contact():
    form = ContactForm()
    if form.validate_on_submit():
        name = form.name.data
        email = form.email.data
        message = form.message.data
        
        contact_message = ContactMessage(name=name, email=email, message=message)
        db.session.add(contact_message)
        db.session.commit()
        
        msg = Message('New Contact Form Submission',
                      sender=app.config['MAIL_DEFAULT_SENDER'],
                      recipients=['your-email@example.com']) 
        msg.body = f'''
        Name: {name}
        Email: {email}
        Message: {message}
        '''
        mail.send(msg)
        
        flash('Your message has been sent and stored successfully!', 'success')
        return redirect(url_for('main.balloon'))

    if request.method == 'POST' and not form.validate():
        flash('Please correct the errors in the form.', 'error')

    return render_template('main/contact.html', form=form)

@main_bp.route('/balloon')
def balloon():
    return render_template('main/balloon.html')

app.register_blueprint(main_bp)

# Error Handlers
@app.errorhandler(404)
def page_not_found(e):
    return render_template('main/404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('main/500.html'), 500

if __name__ == '__main__':
    app.run(debug=True)
