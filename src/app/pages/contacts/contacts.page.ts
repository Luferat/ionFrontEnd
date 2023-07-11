import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  env: any = environment;
  contactForm!: FormGroup;
  contact!: any;
  success: boolean = false;
  firstName: String = "Visitante";

  // Conecta o Authentication.
  private authState = authState(this.auth);
  private authStateSubscription = new Subscription;

  validationMessages: any = {
    name: {
      required: 'O nome é obrigatório.',
      minlength: 'O nome está muito curto.'
    },
    email: {
      required: 'O email é obrigatório.',
      email: 'Digite um email válido.'
    },
    subject: {
      required: 'O assunto é obrigatório.',
      minlength: 'O assunto está muito curto.'
    },
    message: {
      required: 'A mensagem é obrigatória.',
      minlength: 'A mensagem está muito curta.'
    }
  }

  formErrors: any = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private auth: Auth = inject(Auth)
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.success = false;

    // Quando o formulário for editado, executa 'updateValidationMessages()'.
    this.contactForm.valueChanges.subscribe(() => {
      this.updateValidationMessages();
    });

    // Se usuário está logado, preenche os campos 'name' e 'email'.
    this.authStateSubscription = this.authState.subscribe(
      (userData: User | null) => {
        if (userData) {
          this.contactForm.controls['name'].setValue(userData.displayName);
          this.contactForm.controls['email'].setValue(userData.email);
        }
      }
    );
  }

  createForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  // Valida o preenchimento dos campos do formulário em tempo real.
  updateValidationMessages() {
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = this.contactForm.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  sendContact() {
    if (this.contactForm.invalid) return;
    this.contact = this.contactForm.value;
    this.contact.date = new Date();
    this.contact.status = 'sended';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post(environment.apiURL + '/contacts', this.contact, httpOptions).subscribe((response) => {
      console.log('Response do contato enviado:', response);
      this.firstName = this.contact.name.split(' ')[0];
      this.success = true;
    },
      (error) => {
        alert('Oooops!\n' + error.message);
      }
    );
    this.contactForm.reset();
  }

  reset() {
    this.success = false;
    return false;
  }

}
