import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class Contract extends Component {
   constructor() {
       super();
   }
   render() {
      return (
        <div style={{height: '100%'}}>
          <Card style={{width: this.props.isMobile ? '100%':'30%', margin: 'auto', marginTop: this.props.isMobile ? '5%':'1%'}}>
            <CardTitle title="利用規約"/>    
            <CardText>
              この利用規約（以下、「本規約」といいます。）は、タイムメッセージ運営チーム（以下、「運営チーム」といいます。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
              <br/>
              <br/>
              第1条（適用）
              <br/>
              本規約は、ユーザーと運営チームとの間の本サービスの利用に関わる一切の関係に適用されるものとします。
              <br/>
              <br/>
             第2条（ユーザーIDおよびパスワードの管理）
              <br/>
              1.	ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを管理するものとします。
              <br/>
              2.	ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与することはできません。運営チームは、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合（もしくはTwitterアカウントによる認証）には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
              <br/>
              <br/>
              第3条（禁止事項）
              <br/>
              ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
              <br/>
               	（1）法令または公序良俗に違反する行為
              <br/>
               	（2）犯罪行為に関連する行為
              <br/>
               	（3）運営チームのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
              <br/>
               	（4）運営チームのサービスの運営を妨害するおそれのある行為
              <br/>
               	（5）他のユーザーに関する個人情報等を収集または蓄積する行為
              <br/>
               	（6）他のユーザーに成りすます行為
              <br/>
               	（7）運営チームのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
              <br/>
               	（8）運営チーム、本サービスの他の利用者または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為
              <br/>
               	（9）過度に暴力的な表現、露骨な性的表現、人種、国籍、信条、性別、社会的身分、門地等による差別につながる表現、自殺、自傷行為、薬物乱用を誘引または助長する表現、その他反社会的な内容を含み他人に不快感を与える表現を、投稿または送信する行為
              <br/>
               	（10）営業、宣伝、広告、勧誘、その他営利を目的とする行為（運営チームの認めたものを除きます。）、性行為やわいせつな行為を目的とする行為、面識のない異性との出会いや交際を目的とする行為、他のお客様に対する嫌がらせや誹謗中傷を目的とする行為、その他本サービスが予定している利用目的と異なる目的で本サービスを利用する行為
              <br/>
               	（11）宗教活動または宗教団体への勧誘行為
              <br/>
               	（12）その他、運営チームが不適切と判断する行為
              <br/>
              <br/>
              第4条（本サービスの提供の停止等）
              <br/>
              1.	運営チームは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              <br/>
               	（1）本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
              <br/>
               	（2）地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
              <br/>
               	（3）コンピュータまたは通信回線等が事故により停止した場合
              <br/>
               	（4）その他、運営チームが本サービスの提供が困難と判断した場合
              <br/>
              2.	運営チームは、本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害について、理由を問わず一切の責任を負わないものとします。
              <br/>
              <br/>
              第5条（著作権）
              <br/>
              1.	ユーザーは、自ら著作権等の必要な知的財産権を有するか、または必要な権利者の許諾を得た文章を利用し、投稿することができるものとします。
              <br/>
              2.	ユーザーが本サービスを利用して投稿または編集した文章の著作権については、当該ユーザーその他既存の権利者に留保されるものとします。ただし、運営チームは、本サービスを利用して投稿または編集された文章を利用できるものとし、ユーザーは、この利用に関して、著作者人格権を行使しないものとします。
              <br/>
              3.	前項本文の定めるものを除き、本サービスおよび本サービスに関連する一切の情報についての著作権およびその他知的財産権はすべて運営チームまたは運営チームにその利用を許諾した権利者に帰属し、ユーザーは無断で複製、譲渡、貸与、翻訳、改変、転載、公衆送信（送信可能化を含みます。）、伝送、配布、出版、営業使用等をしてはならないものとします。
              <br/>
              <br/>
              第6条（利用制限および登録抹消）
              <br/>
              1.	運営チームは、以下の場合には、事前の通知なく、投稿データを削除し、ユーザーに対して本サービスの全部もしくは一部の利用を制限しまたはユーザーとしての登録を抹消することができるものとします。
              <br/>
               	（1）本規約のいずれかの条項に違反した場合
              <br/>
               	（2）登録事項に虚偽の事実があることが判明した場合
              <br/>
               	（3）1年間以上本サービスの利用がない場合
              <br/>
               	（4）運営チームからの問い合わせその他の回答を求める連絡に対して30日間以上応答がない場合
              <br/>
               	（5）第2条第2項各号に該当する場合
              <br/>
               	（6）その他、運営チームが本サービスの利用を適当でないと判断した場合
              <br/>
              2.	前項各号のいずれかに該当した場合、ユーザーは、当然に運営チームに対する一切の債務について期限の利益を失い、その時点において負担する一切の債務を直ちに一括して弁済しなければなりません。
              <br/>
              3.	運営チームは、本条に基づき運営チームが行った行為によりユーザーに生じた損害について、一切の責任を負いません。
              <br/>
              <br/>
              第7条（保証の否認および免責事項）
              <br/>
              1.	運営チームは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
              <br/>
              2.	運営チームは、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、本サービスに関する運営チームとユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
              <br/>
              3.	前項ただし書に定める場合であっても、運営チームは、運営チームの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（運営チームまたはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。また、運営チームの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は、ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
              <br/>
              4.	運営チームは、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
              <br/>
              <br/>
              第8条（サービス内容の変更等）
              <br/>
              運営チームは、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。
              <br/>
              <br/>
              第9条（利用規約の変更）
              <br/>
              運営チームは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
              <br/>
              <br/>
              第10条（権利義務の譲渡の禁止）
              <br/>
              ユーザーは、運営チームの書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
              <br/>
              <br/>
              第11条（準拠法・裁判管轄）
              <br/>
              1.	本規約の解釈にあたっては、日本法を準拠法とします。
              <br/>
              2.	本サービスに関して紛争が生じた場合には、運営チームの本店所在地を管轄する裁判所を専属的合意管轄とします。
            </CardText>
          </Card>
          <Card style={{width: this.props.isMobile ? '100%':'30%', margin: 'auto', marginTop: this.props.isMobile ? '5%':'1%'}}>
            <CardTitle title="プライバシーポリシー"/>    
            <CardText>
              タイムメッセージでは以下のようにプライバシーポリシーを定めています。サイトを利用するにはこのプライバシーポリシーについて同意する必要があります。
              <br/>
              <br/>
              登録情報
              <br/>
              当サイトではログインに必要なTwitterのログイン情報（authトークン）などの情報を保存しています。これらはサイト利用の範囲内で使われます。 
            </CardText>
          </Card>
        </div>
      );
   }
}
export default Contract;
