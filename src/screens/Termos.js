import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';

const Termos = ({ route, navigation }) => {

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 8, paddingTop: 15, paddingBottom: 20 }}>
          <View>
            <Text style={styles.texto}>
              Seja bem-vindo ao nosso site. Leia com atenção todos os termos abaixo.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Este documento, e todo o conteúdo do site é oferecido por Only Motors com o endereço , neste termo representado apenas por "EMPRESA", que regulamenta todos os direitos e obrigações com todos que acessam o site, denominado neste termo como "VISITANTE", reguardado todos os direitos previstos na legislação, trazem as cláusulas abaixo como requisito para acesso e visita do mesmo.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              A permanência no website implica-se automaticamente na leitura e aceitação tácita do presente termos de uso a seguir. Este termo foi atualizado pela última vez em 14 de setembro de 2021.
            </Text>
          </View>

          <View>
            <Text style={styles.secao}>
              {"\n"}
              1. DA FUNÇÃO DO SITE
            </Text>
          </View>


          <View>
            <Text style={styles.texto}>
              {"\n"}
              Este site foi criado e desenvolvido com a função de trazer conteúdo informativo de alta qualidade, a venda de produtos físicos, digitais e a divulgação de prestação de serviço. A EMPRESA busca através da criação de conteúdo de alta qualidade, desenvolvido por profissionais da área, trazer o conhecimento ao alcance de todos, assim como a divulgação dos próprios serviços.
            </Text>
          </View>


          <View>
            <Text style={styles.texto}>
              {"\n"}
              Nesta plataforma, poderá ser realizado tanto a divulgação de material original de alta qualidade, assim como a divulgação de produtos de e-commerce.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Todo o conteúdo presente neste site foi desenvolvido buscando fontes e materiais de confiabilidade, assim como são baseados em estudos sérios e respeitados, através de pesquisa de alta nível.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Todo o conteúdo é atualizado periodicamente, porém, pode conter em algum artigo, vídeo ou imagem, alguma informação que não reflita a verdade atual, não podendo a EMPRESA ser responsabilizada de nenhuma forma ou meio por qualquer conteúdo que não esteja devidamente atualizado.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              É de responsabilidade do usuário de usar todas as informações presentes no site com senso crítico, utilizando apenas como fonte de informação, e sempre buscando especialistas da área para a solução concreta do seu conflito.
            </Text>
          </View>

          <View>
            <Text style={styles.secao}>
              {"\n"}
              2. DO ACEITE DOS TERMOS
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Este Termo especifica e exige que todo usuário ao acessar o site da EMPRESA, leia e compreenda todas as cláusulas do mesmo, visto que ele estabelece entre a EMPRESA e o VISITANTE direitos e obrigações entre ambas as partes, aceitos expressamente pelo VISITANTE a permanecer navegando no site da EMPRESA.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Ao continuar acessando o site, o VISITANTE expressa que aceita e entende todas as cláusulas, assim como concorda integralmente com cada uma delas, sendo este aceite imprescindível para a permanência na mesma. Caso o VISITANTE discorde de alguma cláusula ou termo deste contrato, o mesmo deve imediatamente interromper sua navegação de todas as formas e meios.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Este termo pode e irá ser atualizado periodicamente pela EMPRESA, que se resguarda no direito de alteração, sem qualquer tipo de aviso prévio e comunicação. É importante que o VISITANTE confira sempre se houve movimentação e qual foi a última atualização do mesmo no começo da página.
            </Text>
          </View>

          <View>
            <Text style={styles.secao}>
              {"\n"}
              3. DO GLOSSÁRIO
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Este termo pode conter algumas palavras específicas que podem não se de conhecimento geral. Entre elas:
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              <Text><Text style={{ fontWeight: "bold" }}>{"\u2022"} VISITANTE:</Text> Todo e qualquer usuário do site, de qualquer forma e meio, que acesse através de computador, notebook, tablet, celular ou quaisquer outros meios, o website ou plataforma da empresa.</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.texto}>
              {"\n"}
              <Text><Text style={{ fontWeight: "bold" }}>{"\u2022"} NAVEGAÇÃO:</Text> O ato de visitar páginas e conteúdo do website ou plataforma da empresa.</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.texto}>
              {"\n"}
              <Text><Text style={{ fontWeight: "bold" }}>{"\u2022"} COOKIES:</Text> Pequenos arquivos de textos gerados automaticamente pelo site e transmitido para o navegador do visitante, que servem para melhorar a usabilidade do visitante.</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.texto}>
              {"\n"}
              <Text><Text style={{ fontWeight: "bold" }}>{"\u2022"} LOGIN:</Text> Dados de acesso do visitante ao realizar o cadastro junto a EMPRESA, dividido entre usuário e senha, que dá acesso a funções restritas do site.</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.texto}>
              {"\n"}
              <Text><Text style={{ fontWeight: "bold" }}>{"\u2022"} HIPERLINKS:</Text> São links clicáveis que podem aparecer pelo site ou no conteúdo, que levam para outra página da EMPRESA ou site externo.</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.texto}>
              {"\n"}
              <Text><Text style={{ fontWeight: "bold" }}>{"\u2022"} OFFLINE:</Text> Quando o site ou plataforma se encontra indisponível, não podendo ser acessado externamente por nenhum usuário.</Text>
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Em caso de dúvidas sobre qualquer palavra utilizada neste termo, o VISITANTE deverá entrar em contato com a EMPRESA através dos canais de comunicação encontradas no site.
            </Text>
          </View>

          <View>
            <Text style={styles.secao}>
              {"\n"}
              4. DO ACESSO AO SITE
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              O Site e plataforma funcionam normalmente 24 (vinte e quatro) horas por dia, porém podem ocorrer pequenas interrupções de forma temporária para ajustes, manutenção, mudança de servidores, falhas técnicas ou por ordem de força maior, que podem deixar o site indisponível por tempo limitado.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              A EMPRESA não se responsabiliza por nenhuma perda de oportunidade ou prejuízos que esta indisponibilidade temporária possa gerar aos usuários.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Em caso de manutenção que exigirem um tempo maior, a EMPRESA irá informar previamente aos clientes da necessidade e do tempo previsto em que o site ou plataforma ficará offline.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              O acesso ao site só é permitido a maiores de 18 anos de idade ou que possuírem capacidade civil plena. Para acesso de menores de idade, é necessária a expressa autorização dos pais ou tutores, ficando o mesmo responsáveis sobre qualquer compra ou acesso efetuados pelo mesmo.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Caso seja necessário realizar um cadastro junto a plataforma, onde o VISITANTE deverá preencher um formulário com seus dados e informações, para ter acesso a alguma parte restrita, ou realizar alguma compra.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Todos os dados estão protegidos conforme a Lei Geral de Proteção de Dados, e ao realizar o cadastro junto ao site, o VISITANTE concorda integralmente com a coleta de dados conforme a Lei e com a Política de Privacidade da EMPRESA.
            </Text>
          </View>

          <View>
            <Text style={styles.secao}>
              {"\n"}
              5. DA LICENÇA DE USO E CÓPIA
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              O visitante poderá acessar todo o conteúdo do website, como artigos, vídeos, imagens, produtos e serviços, não significando nenhum tipo de cessão de direito ou permissão de uso, ou de cópia dos mesmo.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Todos os direitos são preservados, conforme a legislação brasileira, principalmente na Lei de Direitos Autorais (regulamentada na Lei nº 9.610/18), assim como no Código Civil brasileiro (regulamentada na Lei nº 10.406/02), ou quaisquer outras legislações aplicáveis.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Todo o conteúdo do site é protegido por direitos autorais, e seu uso, cópia, transmissão, venda, cessão ou revenda, deve seguir a lei brasileira, tendo a EMPRESA todos os seus direitos reservados, e não permitindo a cópia ou utilização de nenhuma forma e meio, sem autorização expressa e por escrita da mesma.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              A EMPRESA poderá em casos concretos permitir pontualmente exceções a este direito, que serão claramente destacados no mesmo, com a forma e permissão de uso do conteúdo protegido. Este direito é revogável e limitado as especificações de cada caso.
            </Text>
          </View>

          <View>
            <Text style={styles.secao}>
              {"\n"}
              6. DAS OBRIGAÇÕES
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              O VISITANTE ao utilizar o website da EMPRESA, concorda integralmente em:
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              {"\u2022"} De nenhuma forma ou meio realizar qualquer tipo de ação que tente invadir, hacker, destruir ou prejudicar a estrutura do site, plataforma da EMPRESA ou de seus parceiros comerciais. Incluindo-se, mas não se limitando, ao envio de vírus de computador, de ataques de DDOS, de acesso indevido por falhas da mesma ou quaisquer outras forma e meio.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              {"\u2022"} De não realizar divulgação indevida nos comentários do site de conteúdo de SPAM, empresas concorrentes, vírus, conteúdo que não possua direitos autorais ou quaisquer outros que não seja pertinente a discussão daquele texto, vídeo ou imagem.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              {"\u2022"} Da proibição em reproduzir qualquer conteúdo do site ou plataforma sem autorização expressa, podendo responder civil e criminalmente pelo mesmo.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              {"\u2022"} Com a Política de Privacidade do site, assim como tratamos os dados referentes ao cadastro e visita no site, podendo a qualquer momento e forma, requerer a exclusão dos mesmos, através do formulário de contato.
            </Text>
          </View>

          <View>
            <Text style={styles.secao}>
              {"\n"}
              7. DA MONETIZAÇÃO E PUBLICIDADE
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              A EMPRESA pode alugar ou vender espaços publicitários na plataforma, ou no site, diretamente aos anunciantes, ou através de empresas especializadas com o Adsense (Google), Taboola, ou outras plataformas de publicidade.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Essas publicidades não significam nenhuma forma endosso ou responsabilidade pelos mesmos, ficando o VISITANTE responsável pelas compras, visitas, acessos ou quaisquer ações referentes as estas empresas.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Todas as propagandas no site ou plataforma serão claramente destacadas como publicidade, como forma de disclaimer da EMPRESA e de conhecimento do VISITANTE.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Estes anúncios podem ser selecionados pela empresa de publicidade automaticamente, conforme as visitas recentes do VISITANTE, assim como baseado no seu histórico de busca, conforme as políticas de acesso da plataforma.
            </Text>
          </View>

          <View>
            <Text style={styles.secao}>
              {"\n"}
              8. DOS TERMOS GERAIS
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              O Site irá apresentar hiperlinks durante toda a sua navegação, que podem levar diretamente para outra página da EMPRESA ou para sites externos.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Apesar da EMPRESA apenas criar links para sites externos de extrema confiança, caso o usuário acesse um site externo, a EMPRESA não tem nenhuma responsabilidade pelo meio, sendo uma mera indicação de complementação de conteúdo, ficando o mesmo responsável pelo acesso, assim como sobre quaisquer ações que realizem neste site.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Este documento, chamado "Termos de Uso", aplicáveis a todos os visitantes do site, e desenvolvido pelo Advogado Diego Castro (OAB/PI 15.613), foi modificado com permissão para este site.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Em caso que ocorra eventuais conflitos judiciais entre o VISITANTE e a EMPRESA, o foro elegido para a devida ação será o da comarca da Empresa, mesmo que haja outro mais privilegiado.
            </Text>
          </View>

          <View>
            <Text style={styles.texto}>
              {"\n"}
              Este Termo de uso é valido a partir de 14 de setembro de 2021.
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  secao: {
    fontWeight: "bold",
    paddingTop: 20
  },
  subsecao: {
    fontWeight: "600",
    paddingTop: 10
  },
  texto: {
    paddingTop: 5
  },
});

export default Termos;