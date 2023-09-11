import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ETypes } from '../shared/ValueObjects/types';
import validateCPF from '../demo/tools/validateCPF';
import validateCNPJ from '../demo/tools/validateCNPJ';
import axios from 'axios';
import { Message, MessageService } from 'primeng/api';

@Component({
    selector: 'app-person-registration',
    templateUrl: './person-registration.component.html',
    styleUrls: ['./person-registration.component.scss'],
    providers: [MessageService]
})
export class PersonRegistrationComponent {
    formData: any = {
        PersonType: { name: 'Fisica', code: 1 },
        Document: '', //
        Nome: '', //
        Apelido: '', //
        EnderecoCadastro: '', //
        Email: '', //
        Qualification: { name: 'Cliente', code: 1 },
        Role: { name: 'User', code: 1 },
        Password: '', //
    };
    selectedState: any = null;
    errorsMessage: string;
    CEP: string = '';

    dropdownItemsRoles = [
        { name: 'User', code: 1 },
        { name: 'Admin', code: 2 },
    ];
    dropdownItemsQualifications = [
        { name: 'Cliente', code: 1 },
        { name: 'Fornecedor', code: 2 },
        { name: 'Colaborador', code: 3 },
    ];
    dropdownItemsTypes = [
        { name: 'Fisica', code: 1 },
        { name: 'Juridica', code: 2 },
    ];
    isLoading: boolean = false;
    messageService;

    constructor(
        private http: HttpClient,
        public cookieService: CookieService
    ) {}
    async validateRequisition(): Promise<string> {
        let errorMessage = '';
        if (
            (this.formData.PersonType?.code as ETypes) == ETypes.Fisica &&
            !validateCPF(this.formData.Document)
        ) {
            errorMessage += 'Document: CPF Incorreto; ';
        }
        if (
            (this.formData.PersonType?.code as ETypes) == ETypes.Juridica &&
            !validateCNPJ(this.formData.Document)
        ) {
            errorMessage += 'Document: CNPJ Incorreto; ';
        }
        if (!this.formData.Nome) {
            errorMessage += 'Name: Vazio; ';
        }
        if (!this.formData.Apelido) {
            errorMessage += 'Apelido: Vazio; ';
        }
        if (!this.CEP) {
            errorMessage += 'CEP: Vazio ou inválido; ';
        }
        if (!this.formData.Email) {
            errorMessage += 'Email: Vazio; ';
        }
        if (!this.formData.Password) {
            errorMessage += 'Password: Vazio; ';
        }
        if (this.CEP) {
            try {
                const result = await axios.get(
                    `https://viacep.com.br/ws/${this.CEP}/json/`
                );
                this.formData.EnderecoCadastro = JSON.stringify(result.data);
            } catch (error) {
                errorMessage += 'CEP: Incorreto; ';
            }
        }
        return errorMessage;
    }

    async submitForm() {
        this.errorsMessage = await this.validateRequisition();
        if (this.errorsMessage != '') {
            return;
        }
        const accessToken = this.cookieService.get('token');
        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Content-Type', 'application/json')
            .set('accept', 'application/json');
        const formatedForm = {
            ...this.formData,
            PersonType: this.formData.PersonType?.code,
            Qualification: this.formData.Qualification?.code,
            Role: this.formData.Role?.code,
        };
        // Send the POST request to the API
        this.http
            .post(
                'https://localhost:7135/api/v1/Person/Register',
                formatedForm,
                { headers }
            )
            .subscribe(
                (response) => {
                    console.log('Registration successful:', response);
                    this.messageService = [{severity:'success', summary:'Sucesso', detail:"Pessoa registrada com sucesso!"}]
                },
                (error) => {
                    console.log('Registration failed:', error);
                    this.messageService = [{severity:'error', summary:'Parece que algo deu errado', detail:error.error}]
                }
            );
    }
}
