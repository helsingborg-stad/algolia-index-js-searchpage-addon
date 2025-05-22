import { WPPost } from './types'
import { typesenseDataTransform } from './typesense-adapter'

describe('A', () => {
  const document: WPPost = {
    ID: '49727',
    algolia_timestamp: 1740492832,
    blog_id: 2,
    categories: [],
    content:
      ' Alejandro Bustos, en colombiansk entrepren&ouml;r, kom till Helsingborg 2021 och har inga planer p&aring; att l&auml;mna och &aring;ka tillbaka till Colombia. &ndash; Helsingborg &auml;r en mycket s&auml;ker stad med en v&auml;lkomnande atmosf&auml;r, s&auml;ger Alejandro. Alejandro Bustos trivs i Helsingborg Alejandro Bustos, en colombiansk entrepren&ouml;r, kom till Helsingborg 2021 f&ouml;r att &aring;terf&ouml;renas med sin d&aring;varande partner, som studerade ett masterprogram vid Lunds universitet Campus Helsingborg. Alejandro hade tidigare k&auml;nt till Sverige och Stockholm, men f&ouml;r honom var Helsingborg en ok&auml;nd plats tills han faktiskt bes&ouml;kte staden. Alejandro har en bakgrund inom journalistik och historia och &auml;r mycket nyfiken p&aring; nya kulturer. Trots att han gick igenom en skilsm&auml;ssa under sitt f&ouml;rsta &aring;r i Helsingborg best&auml;mde han sig f&ouml;r att stanna. Idag &auml;r Alejandro egenf&ouml;retagare och driver tv&aring; f&ouml;retag inom marknadsf&ouml;ring och kommunikationstj&auml;nster, ett f&ouml;retag registrerat i Colombia och ett i Sverige. &nbsp; &ndash; Jag har f&aring;tt m&aring;nga nya v&auml;nner i Helsingborg och jag har inga planer p&aring; att l&auml;mna och &aring;ka tillbaka till Colombia. Ett blomstrande expat-community &Auml;r det n&aring;got som har f&ouml;rv&aring;nat dig sedan du flyttade till Helsingborg? Jag kan fortfarande inte komma &ouml;ver det faktum att det finns ett s&aring; engagerat och blomstrande expat community i Helsingborg, och en bra blandning mellan svenskar och internationella. Som entrepren&ouml;r &auml;r jag imponerad av antalet start-ups och innovationshubbar som en stad av Helsingborgs storlek kan erbjuda. Ett annat intressant faktum som jag inte hade en aning om tidigare &auml;r att Helsingborg har Sveriges n&auml;st st&ouml;rsta hamn och &auml;r en mycket viktig logistisk nod i s&ouml;dra Sverige. Till exempel anl&auml;nder alla bananer som skeppas till Sverige till Helsingborgs hamn. Alejandros 3 b&auml;sta saker med att bo i Helsingborg: Helsingborg har den perfekta balansen mellan en sm&aring;stad och en storstad! Staden har ett rikt kulturliv, barer och restauranger men det &auml;r inte f&ouml;r tr&aring;ngt och hektiskt. Helsingborg &auml;r en mycket s&auml;ker stad med en v&auml;lkomnande atmosf&auml;r. &nbsp; Kan du rekommendera Helsingborg till andra internationella studenter? Ja, det finns n&aring;got h&auml;r f&ouml;r alla! Oavsett vilka incitament du har f&ouml;r att flytta till Helsingborg kommer det alltid att finnas aktiviteter och tj&auml;nster som hj&auml;lper och v&auml;gleder dig. Helsingborg &auml;r ocks&aring; ett v&auml;xthus f&ouml;r nya id&eacute;er, d&auml;r du kan hitta b&aring;de offentligt och privat kapital f&ouml;r att utveckla projekt. Svenskar &auml;r ocks&aring; riktigt bra v&auml;nner. &ndash; Man kan t&auml;nka p&aring; svenskar som popcorn, s&auml;ger Alejandro och skrattar. De kan vara lite jobbiga i b&ouml;rjan, och n&auml;r det &auml;r kallt, men n&auml;r du v&auml;l har v&auml;rmt upp dem och de litar p&aring; dig s&aring; kommer de att poppa och ge dig s&aring; mycket tillbaka. \\r\\n\\r\\n\\r\\n',
    embedding: [
      -0.023418115451931953, -0.011796395294368267, 0.0005083775031380355,
      0.03602966293692589, -0.005048112012445927, -0.0018282666569575667,
    ],
    id: '5283',
    objectID: 'foretagare-helsingborg-se-2-49727',
    origin_site: 'Företagare Helsingborg',
    origin_site_url: 'https://foretagare.helsingborg.se',
    permalink:
      'https://foretagare.helsingborg.se/nyheter/intervju-med-alejandro-bustos/',
    post_date: 1715168348,
    post_date_formatted: '2024-05-08',
    post_excerpt:
      'Alejandro Bustos, en colombiansk entrepren&ouml;r, kom till Helsingborg 2021 och har inga planer p&aring; att l&auml;mna och &aring;ka tillbaka till Colombia. - Helsingborg &auml;r en mycket s&auml;ker stad med en v&auml;lkomnande atmosf&auml;r, s&auml;ger Alejandro. Alejandro Bustos trivs i Helsingborg Alejandro Bustos, en colombiansk entrepren&ouml;r, kom till Helsingborg 2021 f&ouml;r att &aring;terf&ouml;renas med sin d&aring;varande partner,...',
    post_modified: 1736952192,
    post_title:
      'Intervju med Alejandro Bustos &ndash; fr&aring;n Colombia till Helsingborg',
    post_type: 'nyheter',
    post_type_name: 'Nyheter',
    tags: ['Företagare'],
    thumbnail:
      'https://media.helsingborg.se/uploads/networks/1/sites/2/2024/05/img_3906-scaled-480x270.webp',
    thumbnail_alt: 'Alejandro Bustos',
    uuid: 'foretagare-helsingborg-se-2-49727',
  }

  it('Transform full Typesense document to generic format', async () => {
    const data = typesenseDataTransform([
      {
        document,
      },
    ])
    expect(data[0].title).toEqual(
      'Intervju med Alejandro Bustos &ndash; fr&aring;n Colombia till Helsingborg'
    )
    expect(data[0].subtitle).toEqual('Företagare Helsingborg')
    expect(data[0].summary).toEqual(
      'Alejandro Bustos, en colombiansk entrepren&ouml;r, kom till Helsingborg 2021 och har inga planer p&aring; att l&auml;mna och &aring;ka tillbaka till Colombia. - Helsingborg &auml;r en mycket s&auml;ker stad med en v&auml;lkomnande atmosf&auml;r, s&auml;ger Alejandro. Alejandro Bustos trivs i Helsingborg Alejandro Bustos, en colombiansk entrepren&ouml;r, kom till Helsingborg 2021 f&ouml;r att &aring;terf&ouml;renas med sin d&aring;varande partner,...'
    )
    expect(data[0].image).toEqual(
      'https://media.helsingborg.se/uploads/networks/1/sites/2/2024/05/img_3906-scaled-480x270.webp'
    )
    expect(data[0].url).toEqual(
      'https://foretagare.helsingborg.se/nyheter/intervju-med-alejandro-bustos/'
    )
  })
  it('Transform minimal Typesense document to generic format', async () => {
    const data = typesenseDataTransform([
      {
        document: {
          ID: '49727',
          objectID: 'foretagare-helsingborg-se-2-49727',
        },
      },
    ])
    expect(data[0].title).toEqual('')
    expect(data[0].subtitle).toEqual('')
    expect(data[0].summary).toEqual('')
    expect(data[0].image).toEqual('')
    expect(data[0].url).toEqual('')
  })
})
