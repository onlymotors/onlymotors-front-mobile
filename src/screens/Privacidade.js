import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';

const Privacidade = ({ route, navigation }) => {

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: 8, paddingTop: 15, paddingBottom: 20 }}>
          <Text style={styles.texto}>
            A Política de Privacidade e Segurança descrita abaixo constitui parte das Condições de Termos e Uso do presente site, respeitando todas as normas previstas nas legislações vigentes em nosso país, principalmente na Lei Geral de Proteção de Dados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            A Visita e permanência no site implica-se automaticamente na concordância explicita na política abaixo em todos os seus termos.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Este site é operado, mantido e de inteira propriedade de (nome da empresa, inscrita no CNPJ n°, com endereço endereço completo,  cidade e Estado e inscrição estadual n°.– Caso seja pessoa física, você pode colocar apenas seu nome) e está hospedado com o endereço (adicionar endereço do site).
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Informações Gerais
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Este site realiza os tratamentos de dados pessoais dos usuários do site, desde a fase da sua coleta até a sua eliminação, respeitando a legislação do país onde foi criado.Atuando como controlador dos dados pessoais coletados por meio desse site, ficamos à disposição das normas trazidas na Lei Federal n.13.709/2018, Lei Geral de Proteção de dados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O Site trabalha com todas as medidas necessárias para trazer segurança e proteção a privacidade de seus usuários, trazendo detalhadamente a forma de atuação do site referente as etapas de coleta, armazenamento, uso, compartilhamento e divulgação dos dados pessoais dos usuários,  bem como a forma como é realizada a segurança e proteção dos dados que são coletados na nossa página.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O site será tratado no decorrer dessa Política de Privacidade e Segurança como “nós “, “nos”, “conosco” e “nosso”.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Observação importante
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Realizamos o tratamento dos seus dados pessoais com total responsabilidade e para demonstrar a transparência da nossa coleta e utilização de dados pessoais, disponibilizamos a política de privacidade, que contém informações necessárias esclarecedoras para os usuários do nosso site, como:
          </Text>


          <Text style={styles.texto}>
            {"\n"}
            {"\u2022"} Nome do mantenedor, operador e proprietário do site;
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            {"\u2022"} Para qual público é voltado nosso site;
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            {"\u2022"} A partir de qual idade é indicado absorver os conteúdos do site;
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            {"\u2022"} Quais os dados são coletados;
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            {"\u2022"} O que é feito com os dados coletados?
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            {"\u2022"} Como ocorre o tratamento dos dados coletados?
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            {"\u2022"} Uso de cookies;
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            {"\u2022"} É possível o compartilhamento ou publicação dos dados por terceiros?
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            {"\u2022"} Formas de entrar em contato conosco.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Sobre o nosso site
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Nosso site tem como principal objetivo informar e levar conhecimento, e atua por meio da publicação de textos, vídeos, áudios e os demais conteúdos aqui vinculados em busca de trazer informações de suma importância a respeito dos assuntos aqui tratados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            De forma responsável, o site declara assumir  compromisso total com a segurança e privacidade dos dados de seus clientes, durante todo o período de navegação em nosso site.Esta política de privacidade e segurança tem como principal objetivo de esclarecer e demonstrar aos visitantes do nosso site, como todas as informações, aqui coletadas, serão tratadas e quais poderão ser divulgadas ou publicadas com nossos parceiros.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Qualquer modificação em nossa Política de Privacidade é Segurança serão informadas aos nossos usuários de forma imediata neste espaço.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Ao acessar o nosso site, o usuário concorda, aceita e adere de forma automática todas as informações e condições previstas neste documento, que pode ser denominado como Política de Privacidade e Segurança ou Termos de Uso, que devem ser obrigatoriamente respeitados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O site traz abaixo todas as regras e termos referente a privacidade e o uso da nossa página, qualquer comunicado posterior será notificado de forma expressa aos nossos usuários.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            A equipe do nosso site está à disposição para esclarecer quaisquer  dúvidas.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O nosso site é indicado para pessoas a partir de 18 anos, que possuam interesse ou curiosidade a respeito do conteúdo que trazemos.Caso seja menor que 18 anos, é necessário a permissão do responsável.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O conteúdo do nosso site é produzido por nossa equipe respeitando os valores éticos e humanos, bem como os princípios morais, buscando informar da melhor maneira a respeito do conteúdo que trazemos.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Dados coletados
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            O nosso site coleta alguns dados e informações dos nossos usuários, como será explicado abaixo neste tópico.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Dados pessoais do usuário
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Os dados pessoais do usuário coletados pelo nosso site, são fornecidos exclusiva e expressamente pelo usuário, exceto previsões mencionadas abaixo, contudo, só serão coletados e tratados com o consentimento do usuário.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Coleta de dados
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            A coleta de dados realizada pelo nosso site acontece ou pode acontecer em todas as páginas, no momento do preenchimento de formulários, cadastro para contato ou envio de dúvidas.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O usuário do nosso site ao acessa-lo e preencher qualquer dos formulários do nosso site, assim como ao aceitar o s cookies utilizados, demonstra de forma expressa e clara concorda e dá seu consentimento para a coleta e os demais tratamentos de seus dados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O nosso site coletará informações dos usuários, como nome completo, endereço de IP, telefone do usuário, e-mail, telefone de contato entre outros dados que são coletados com o preenchimento dos formulários presentes neste website.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Podemos também trabalhar com web beacons para monitorar o desempenho dos acessos em nossos posts.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Modo de Coleta de Dados
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Só realizamos a coleta de dados do usuário em casos necessários, como por exemplo para lhe disponibilizar algum serviço, mas tudo conforme as legislações vigentes no nosso país e respeitando expressamente a Lei Geral de Proteção de Dados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            A coleta de dados que acontece no nosso site, ocorre apenas quando há o conhecimento e, livre e espontâneo consentimento do usuário.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Não realizamos nenhuma coleta de dados sem a permissão do usuário, ou por qualquer meio que possa tornar o consentimento inválido, como a coerção.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            A coleta de dados pode acontecer através do preenchimento da Fale Conosco, de formulários presentes no nosso site, do preenchimento de cadastro no nosso site, de compras realizadas no nosso site ou do aceite para receber informações em seu e-mail ou número de contato.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Coleta automática de dados pessoais
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Podemos nonitorar nosso site com web beacons e analytics, trabalhamos com a coleta de alguns dados dos usuários de forma automática, mas esses dados são computados apenas para conhecermos melhor o nosso público e termo conhecimento a respeito de quais posts são mais acessados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os dados coletados  de forma automática são tratados com segurança e respeitando a privacidade de nossos usuários, sendo coletados diretamente pelo sistema.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Finalidade da Coleta de dados
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Todos os dados fornecidos por nossos usuários são utilizados unicamente com a finalidade de prestação de serviço e melhor desempenho, pois através dos dados coletados podemos elaborar de forma mais direcionada nosso conteúdo, não buscamos nenhuma espécie de vantagem sobre eles.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os dados fornecidos para que entremos em contato por meio do FAQ ou do Fale Conosco são utilizados unicamente para essa finalidade.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            A Coleta de dados ocorre também para podermos enviar novidades ou serviços que desempenhamos, mas sempre com o consentimento do usuário, já que é necessário o preenchimento de formulário ou a aceitação dos nossos cookies.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Dados que não são coletados
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            O nosso site não trabalha com a coleta de dados sensíveis, pois só utilizamos de fato o que é necessário para a realização dos nossos serviços.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os dados sensíveis, como a etnia, religião e genética, como estão estabelecidos na Lei de Proteção Geral de Dados não são coletados ou requeridos pela nossa página.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os dados sensíveis só serão coletados por nós em casos expressamente necessários e previstos na legislação supracitada, sendo informado ao usuário a respeito dessa coleta, do modo como ocorrerá o tratamento e a finalidade da coleta desses dados sensíveis.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Compartilhamento, publicação ou divulgação dos dados dos usuários a terceiros
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Trabalhamos sempre pensando no bem-estar do nosso usuário, por esse motivo, utilizamos a boa-fé como base para divulgação, compartilhamento ou publicação de qualquer dado coleta por nós.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Não trabalhamos com compartilhamento, publicação ou divulgação de dados que coletamos dos nossos usuários, exceto em casos, onde há previsão de leis, determinação judicial, boletim, comprimento de alguma determinação de autoridade pública, onde se torne obrigatória alguma dessas condutas, ou alguma hipótese de determinação regulatória.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            É permitido o acesso aos dados coletados por nós, a um terceiro que tenha permissão do titular dos dados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Em caso de investigação criminal deixamos cientes todos os nossos usuários de que cooperaremos da forma que nos for requisitada.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Não podemos recusar compartilhar dados nos casos acima mencionados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Por trabalharmos com parceiros é importante informar, que o nosso site pode ter links ou hiperlinks para sites externos que não possuem nenhum vínculo com o modo operacional ou com o sistema do nosso site, possuindo inclusive, Politica de Privacidade e Segurança diferente do nosso.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os sites externos trabalham conforme estabelecido nos seus termos de uso, informamos que não temos nenhum poder de caracterizar o modo como acontece a coleta, o tratamento e a eliminação dos dados armazenados pelos sites externos.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Não temos nenhum controle sobre o conteúdo dos links e hiperlinks externos que você pode encontrar por todo nosso site.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Newsletter
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            O site utiliza newsletter para encaminhar aos nossos usuários, informações semanais a respeito das atualizações realizadas.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Além disso, é possível que o usuário receba em datas certas uma avaliação para sabermos, o que precisamos melhorar em nosso site e como está indo nosso desempenho.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os dados coletados por nosso site são informados a newsletter apenas para a finalidade descrita acima e respeitando o que é estabelecido nas legislações do nosso país.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Anonimização de dados
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Anonimização de dados é um conjunto de etapas que são realizados após a coleta de dados de uma determinada pessoa, para desvincular aqueles dados da figura do titular deles, não permitindo assim, que posteriormente seja possível unir as informações dos dados a uma pessoa específica, mesmo com a utilização de técnicas mais elaboradas que poderiam conseguir esse resultado.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Todos os dados dos usuários, após serem utilizados para a finalidade para qual foram coletados são anonimizados, não sendo possível identificar o titular de determinado dado e tornando-se inviável que se reúna essas informações novamente para identificar quem é o seu proprietário.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            A anonimização de dados deste site respeita todas as normas estabelecidas na legislação vigente no País, inclusive as formas técnicas e administrativas que devem ser utilizadas.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Cookies
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            O nosso site trabalha com a política de cookies para melhorar a sua experiência em nosso ambiente virtual, como buscamos sempre o melhor para nossos usuários, utilizamos esse mecanismo para coletar dados e armazená-los com o seu consentimento, além disso, é através dos cookies que informamos o modo como você pode recusar a permissão para o armazenamento dos seus dados.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            O que são cookies?
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Cookies são pequenos arquivos enviados por sites de lojas, empresas, sites e etc.ao navegador, para proporcionar uma melhor experiência ao usuário, pois eles realizam um registro a respeito dos dados dos usuários, disponibilizando mais rápido conteúdo e informações que proporcionem satisfação ao nosso usuário.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os cookies não são vírus, ou spam, por isso não se preocupe quando receber um aviso para aceitar os cookies em alguma de nossas páginas.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Formas de uso dos cookies
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Os nossos cookies são relativos a preenchimento de formulários, preferências do site e boletins por e-mail.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O preenchimento de formulários em nossas páginas faz com que os cookies sejam ativados, pois é por meio deles que poderemos realizar contatos futuros com nossos usuários.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os cookies relativos a preferências de site são utilizados pelo nosso site em busca de proporcionar uma experiência excelente aos nossos usuários, já que é através desse mecanismo que podemos buscar informações a respeito das suas preferências, sendo utilizados sempre que você acessar alguma das páginas do presente site.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Para vincularmos anúncios de acordo com suas preferências utilizamos cookies de publicidades comportamental, assim levamos até você, anúncios relevantes e que podem agregar ao seu interesse.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os boletins por e-mail são ofertados pelo nosso site, para lhe proporcionar informações a respeito das novidades trazidas, os cookies utilizados para essa finalidade coletam seus dados para lembrar se você possui cadastro em nossa página.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Cookies de terceiros
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Nosso site trabalha com alguns parceiros confiáveis como o Google Adsenses ou Google Analytics, por esse motivo utilizamos cookies que são necessários para o desempenho desse sistema.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O Google Analytics é uma das ferramentas utilizadas em nosso site para podermos entender a forma como você utiliza nosso site, por meio das informações fornecidas podemos melhorar o desempenho da nossa plataforma.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Consulte a página oficial do Google Analytics para ter mais informações a respeito dos cookies utilizados por ele e da forma como procedem o tratamento dos dados armazenados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O Google Adsenses disponibiliza uma página para que os usuários possam acessar as suas políticas de privacidade e a FAQ.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Utilizamos os cookies descritos acima para monitorar o uso do nosso site pelos usuários, assim poderemos observar métricas e continuar a produzir conteúdo atrativo e de grande valor para você, ademais, assim, temos informações a respeito do tempo que você permanece em cada uma de nossas publicações.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Uso de anúncios
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Nossa plataforma permite anúncios em suas páginas em busca de auxiliar no financiamento e na manutenção dos recursos utilizados em nosso site, além de possibilitar o desenvolvimento por meio dessa receita.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O cookie DoubleClick é utilizado pelo Google Adsenses em nosso site e é através dele que controlamos a quantidade de vezes que um anúncio é exibido ao nosso usuário.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Nosso site também trabalha com parceiros em busca de proporcionar uma experiência completa e adequada para o conteúdo que trazemos em nosso post.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os cookies de rastreamento utilizados em nossa página é um mecanismo para que possamos dimensionar quantos usuários clicaram no site através do site de um parceiro.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Não aceitação dos cookies
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            O nosso site permite que você se recuse a aceitar os cookies que trabalhamos, mas fique ciente que a recusa desse serviço pode proporcionar uma experiência menos agradável a você, já que ela limita o desempenho de alguns serviços disponibilizados por nós.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            A recusa dos cookies pode acontecer de forma expressa, quando você aperta o botão em negativa a mensagem exibida no site informando a respeito dos cookies.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Ou você pode utilizar outra ferramenta disponível no seu navegador.Consulte a aba de ajuda do seu navegador para saber como fazer isso, mas lembre-se que essa desativação serve para os cookies do nosso site e de outros sites.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Não recomendamos que você recuse ou desative os cookies, pois é por meio deles que lhe proporcionamos uma experiência melhor e direcionada as suas necessidades, além disso a recusa ou desativação diminui as funcionalidades disponíveis para você, como por exemplo o preenchimento de formulários para que possamos retornar algum contato que você realize.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Armazenamento de dados
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Todos os dados que armazenamos tem uma finalidade legitima e que é informada previamente aos nossos usuários, sendo armazenados apenas após o consentimento do usuário e respeitando o que prevê a legislação vigente sobre esse assunto.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Nós armazenamos dados dos nossos usuários em busca de gerar uma experiência melhor para eles ao acessarem nosso site, para ter controle da dinâmica em nossas páginas, responder comentários, dúvidas e retornar contatos futuros.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os dados armazenados para comunicar as atualizações do nosso site todos são armazenados com segurança e expressamente para essa finalidade.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O período de tempo de armazenamento dos dados é de (coloque o período em que você armazenará os dados, ou caso você não saiba um período específico inicie com o parágrafo abaixo).
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os dados que coletamos e tratamos são utilizados por um período de tempo adequado a finalidade que é descrita neste documento.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O armazenamento dos dados realizado por nós, não retira qualquer direito do titular dos dados pessoais sobre ele.Além disso, respeitamos todos os direitos do controlador do site e as demais disposições reguladoras ou legais que versem sobre esse assunto.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os dados armazenados por nós são tratados com toda segurança para promover a proteção do nosso usuário de qualquer evento danoso.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Tratamento de dados
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            O tratamento dos dados coletados por nossa plataforma respeita todas as normas estabelecidas na Lei Geral de Proteção de Dados, respeitando o direito do usuário de ter acesso aos seus dados e alterá-los a qualquer momento durante nosso armazenamento.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os dados tratados por nós estão todos seguros, pois utilizamos técnicas para preservar a privacidade de todos os titulares dos dados coletados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Não realizamos nenhum tratamento de dados ilícito ou que vá contra o que estabelece as normas brasileiras e esta Política de Privacidade e Segurança.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            As etapas dos tratamentos de dados inicia-se desde a sua coleta.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            As atividades referente ao tratamento de dados realizadas por nós, tem base legal para acontecer, respeitando os limites previstos na legislação.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Disponibilizamos o nosso canal de contato para responder qualquer dúvida a respeito da base legal que fundamentamos o tratamento dos dados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Você pode entrar em contato conosco pela aba Fale Conosco e pelos canais de atendimento presentes ao final desta Política de Privacidade e Segurança.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Eliminação dos dados armazenados
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Os dados são armazenados apenas durante o período em que são utilizados para a finalidade específica para qual foram coletados, após esse período realizamos a eliminação dos dados do nosso sistema ou os anonimizamos.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Não temos nenhum interesse em continuar armazenando os dados dos nossos usuários após o período necessário para o fim que foram coletados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O armazenamento de dados continuará ainda que a finalidade tenha sido realizada, quando houver disposição legal a respeito disso ou disposição regulatória que impeçam a sua eliminação ou anonimização.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            A anonimização dos dados realizados pelo nosso site é uma maneira de manter a segurança dos dados coletados dos nossos usuários após a finalidade para qual a coleta aconteceu for alcançada.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Segurança no tratamento dos dados
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Os nossos sistemas de proteção atendem a todos os requisitos trazidos na Lei 13.709/2018, respeitando as condutas de boa prática, as medidas de segurança técnicas e administrativas para proteção dos dados coletados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Temos muito cuidado e preocupação em proporcionar segurança aos dados coletados dos nossos usuários, por esse motivo utilizamos ferramentas específicas para garantir a privacidade dos dados que tratamos.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            As técnicas utilizadas para assegurar a segurança dos dados coletados por nosso website são todas adequadas e aptas a gerar a proteção integral dos dados dos usuários de qualquer possível situação onde possa ser obtido os dados, compartilhados, publicados, destruídos e alterados sem autorização e de maneira irregular.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Adotamos medidas específicas para cada espécie de dados sendo o modo de segurança direcionado especificadamente para o dado que foi coletado, de acordo com o contexto da sua coleta e sua finalidade.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Utilizamos proteção em nossos computadores por meio da criptografia de dados e/ ou firewall.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O acesso físico aos nossos arquivos só acontece quando é necessário que algum de nossos funcionários tenham acesso a eles para desempenhar sua função profissional.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os dados anonimizados não são considerados pelo nosso site como informações pessoais, visto que através deles não é possível criar nenhum vínculo com o titular dos dados, já que não há como identificá-lo.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Os dados anonimizados são mantidos em nossos arquivos e sistemas com toda a segurança técnica necessária para sua proteção.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            É importante informar que tomamos todos os cuidados para proteger os dados de nossos usuários, mas ainda assim, há algumas situações que acontecem onde há o vazamento de dados.O nosso website não é responsável por qualquer incidente com dados pessoais que aconteça por situação em que não temos o controle, como a culpa exclusiva do usuário, ou ataques de hackers.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Qualquer incidente que cause danos aos dados pessoais dos usuários, informaremos as autoridades responsáveis, conforme a Lei 13.709/2018.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Botões de compartilhamento nas redes sociais
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Os botões de compartilhamento utilizado em nosso site, são uma maneira de aumentar o tráfego em nossas publicações e otimizar a divulgação de nossos posts.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Para utilizar nossos botões de compartilhamento basta clicar neles e escolher a rede social que desejar.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Ao usar um dos botões de compartilhamento disponíveis, você demonstra aceitar e está de acordo em informar todos os dados necessários para o compartilhamento acontecer, de acordo com a necessidade da plataforma escolhida para compartilhamento.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Consentimento do usuário
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            O usuário permite de livre e espontânea vontade que seus dados sejam coletados por nosso site e armazenados pelo período necessário para  realização da finalidade estabelecida.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O usuário afirma que não sofreu qualquer coação,  ou foi induzido a concordar com essa Política de Privacidade e segurança.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O usuário pactua que navegará e utilizará adequadamente os conteúdos publicados em nosso site, agindo de boa-fé e respeitando uma conduta digna e respeitosa, sem realizar comentários discriminatórios a respeito de temas religiosos, raciais, terroristas, jogos proibidos e etc.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            O usuário compromete-se a não causar nenhum dano ao site, não devendo gerar comentários maldosos na publicação, não disseminar vírus que causem  dano aos hardware e softwares dos nossos parceiros e ao nosso website.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Futuras alterações neste documento
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Está Política de Privacidade e Segurança segue todas as regras trazidas na legislação brasileira, especialmente as presentes na Lei Geral de Proteção de Dados.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Não há um período específico para ocorrer qualquer modificação neste texto, por esse motivo informamos ser livre o nosso direito de alteração a qualquer momento, principalmente no caso de alterações feitas na legislação brasileira ou no nosso site.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Nós comprometemos a informar aos nossos usuários a respeito de qualquer alteração que aconteça nesta Política de Privacidade e Segurança.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Formas de entrar em contato conosco
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Buscamos sempre o melhor relacionamento com o nosso usuário, por esse motivo estamos a disposição para responder qualquer dúvida a respeito da nossa Política de Privacidade e segurança e a informar sobre o tratamento de dados realizados por nós.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Você pode entrar em contato conosco através de email, telefone ou endereço disposto na aba Quem somos, ou Contato.
          </Text>

          <Text style={styles.secao}>
            {"\n"}
            Informações adicionais
          </Text>
          <Text style={styles.texto}>
            {"\n"}
            Este documento foi desenvolvido pelo Advogado Diego Castro (OAB/PI 15.613) e modificado com permissão para este site, com a função de explicitar e orientar os nossos usuários a respeito da Política de Privacidade e Segurança utilizada pelo nosso site.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Esperamos que tenha ficado claro todos os pontos debatidos neste documento.
          </Text>

          <Text style={styles.texto}>
            {"\n"}
            Está Política de Privacidade e Segurança passa a ter validade a partir de 17 de Junho de 2021 com validade indeterminada.
          </Text>
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

export default Privacidade;