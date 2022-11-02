import firebase from '../config';
import Cliente from "../../core/Cliente";
import ClienteRespositorio from "../../core/ClienteRepositorio";

export default class ColecaoCliente implements ClienteRespositorio {

    private conversosr = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.getNome,
                idade: cliente.getIdade
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) {
            const dados = snapshot.data(options);
            return new Cliente(dados.nome, dados.idade, snapshot.id);
        }
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        if(cliente?.getId) {
            await this.colecao().doc(cliente.getId).set(cliente)
            return cliente
        } else {
            const docRef = await this.colecao().add(cliente)
            const doc = await docRef.get()
            return doc.data()
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        return this.colecao().doc(cliente.getId).delete()
    }

    async obterTodos(): Promise<Cliente[]> {
        const query = await this.colecao().get()
        return query.docs.map(doc => doc.data()) ?? []
    }

    private colecao() {
        return firebase.firestore().collection('clientes')
            .withConverter(this.conversosr)
    }
}