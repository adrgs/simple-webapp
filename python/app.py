from flask import Flask, render_template, request, render_template_string

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', name='World')

@app.route('/super-secret')
def secret():
  name = request.args.get('name') or 'World'
  name = render_template_string(name)
  return render_template('index.html', name=name)

if __name__ == '__main__':
    app.run(debug=True, port=7777, host='localhost')
