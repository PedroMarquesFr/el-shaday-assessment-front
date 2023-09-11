// @ts-nocheck
import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ETypes } from '../shared/ValueObjects/types';
import validateCPF from '../demo/tools/validateCPF';
import validateCNPJ from '../demo/tools/validateCNPJ';
import axios from 'axios';
import { Message, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-person-edition',
    templateUrl: './person-edition.component.html',
    styleUrls: ['./person-edition.component.scss'],
})
export class PersonEditionComponent {
    formData: any = {
        Id: '', //
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
        public cookieService: CookieService,
        private route: ActivatedRoute
    ) {}
    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const id = params.get('id');
            this.getPerson(id);
        });
    }
    async validateRequisition(): Promise<string> {
        debugger;
        let errorMessage = '';
        // if (
        //     (this.formData.PersonType?.code as ETypes) == ETypes.Fisica &&
        //     !validateCPF(this.formData.Document)
        // ) {
        //     errorMessage += 'Document: CPF Incorreto; ';
        // }
        // if (
        //     (this.formData.PersonType?.code as ETypes) == ETypes.Juridica &&
        //     !validateCNPJ(this.formData.Document)
        // ) {
        //     errorMessage += 'Document: CNPJ Incorreto; ';
        // }
        if (!this.formData.Nome) {
            errorMessage += 'Name: Vazio; ';
        }
        if (!this.formData.Apelido) {
            errorMessage += 'Apelido: Vazio; ';
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
    async getPerson(id: string) {
        const accessToken = this.cookieService.get('token');
        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${accessToken}`)
            .set('Content-Type', 'application/json')
            .set('accept', 'application/json');
        // Send the POST request to the API
        this.http
            .get(`https://localhost:7135/api/v1/Person?personid=${id}`, {
                headers,
            })
            .subscribe(
                (response) => {
                    // debugger;
                    this.formData.Id = response?.id;
                    this.formData.Document = response?.document;
                    this.formData.Email = response?.email;
                    this.formData.EnderecoCadastro = response?.personAddress;
                    this.formData.Nome = response?.name;
                    this.formData.Apelido = response?.apelido;
                    this.formData.PersonType.code = response?.typeId;
                    this.formData.Qualification.code =
                        response?.qualificationId;
                    this.formData.Role.code = response?.roleId;
                    this.formData.Password = reponse?.password;

                    console.log(this.formData.Password);
                    this.messageService = [
                        {
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Dados da pessoa recuperados com sucesso!',
                        },
                    ];
                },
                (error) => {
                    console.log('Registration failed:', error);
                    this.messageService = [
                        {
                            severity: 'error',
                            summary:
                                'Parece que algo deu errado na recuperação dos dados da pessoa',
                            detail: error.error,
                        },
                    ];
                }
            );
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
        debugger;
        const formatedForm = {
            ...this.formData,
            personType: this.formData.PersonType?.code,
            Qualification: this.formData.Qualification?.code,
            Role: this.formData.Role?.code,
        };
        // Send the POST request to the API
        this.http
            .put('https://localhost:7135/api/v1/Person/Update', formatedForm, {
                headers,
            })
            .subscribe(
                (response) => {
                    console.log('Registration successful:', response);
                    this.messageService = [
                        {
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Pessoa registrada com sucesso!',
                        },
                    ];
                },
                (error) => {
                    console.log('Registration failed:', error);
                    this.messageService = [
                        {
                            severity: 'error',
                            summary: 'Parece que algo deu errado',
                            detail: error.error,
                        },
                    ];
                }
            );
    }
}
