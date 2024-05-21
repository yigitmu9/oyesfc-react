export const TeamNames = {
    oYesFc: 'O Yes FC'
}

export const TeamMembers = {
    can: {name: 'Can Şahin', number: 1, role: 'gk', birthYear: 1998, birthMonth: 12, birthDay: 23, ratings: [3, 4.5, 2, 7, 8, 3]},
    atakan: {name: 'Atakan Rakipsiz', number: 2, role: 'df', birthYear: 1998, birthMonth: 10, birthDay: 11, ratings: [5, 5, 8.5, 7, 6, 6]},
    berk: {name: 'Berk Doğan', number: 5, role: 'df', birthYear: 1998, birthMonth: 10, birthDay: 2, ratings: [7, 6, 7, 8, 8, 7.5]},
    berent: {name: 'Berent Özsan', number: 99, role: 'fw', birthYear: 1999, birthMonth: 5, birthDay: 26, ratings: [8.5, 7.5, 7.5, 6, 7, 7]},
    gokhan: {name: 'Gökhan Cömert', number: 4, role: 'fw', birthYear: 1999, birthMonth: 10, birthDay: 20, ratings: [7, 7, 6, 6, 5, 6]},
    mehmet: {name: 'Mehmet Çelik', number: 8, role: 'df', birthYear: 1999, birthMonth: 10, birthDay: 22, ratings: [4, 4, 6, 7, 7, 5.5]},
    mert: {name: 'Mert Mutlu', number: 16, role: 'fw', birthYear: 2005, birthMonth: 2, birthDay: 3, ratings: [8.5, 8, 7, 6, 5, 7]},
    oguzhan: {name: 'Oğuzhan Cesur', number: 18, role: 'df', birthYear: 1999, birthMonth: 2, birthDay: 19, ratings: [2, 3, 6, 5, 8, 5.5]},
    ogulcan: {name: 'Oğulcan Sakallıoğlu', number: 10, role: 'fw', birthYear: 1998, birthMonth: 5, birthDay: 19, ratings: [8, 8, 7, 5.5, 6, 6.5]},
    utku: {name: 'Utku Öztürk', number: 3, role: 'df', birthYear: 1999, birthMonth: 3, birthDay: 6, ratings: [6, 6, 6, 6.5, 8, 6]},
    yigit: {name: 'Yiğit Mutlu', number: 7, role: 'fw', birthYear: 1999, birthMonth: 6, birthDay: 16, ratings: [8, 8.5, 6.5, 5.5, 6, 6.5]}
}

export const Facilities = [
    {
        name: 'Saraylar',
        googleUrl: 'https://maps.app.goo.gl/Y5WvAj17RjnbToEc6',
        appleUrl: 'https://maps.apple.com/?address=340.%20Sk.,%2016235%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=11739866816629859544&ll=40.221488,28.909376&lsp=9902&q=Saraylar%20Hal%C4%B1%20Saha',
        xAppleLocation: `VALUE=URI;X-APPLE-RADIUS=70.67126169878655;X
 -APPLE-REFERENCEFRAME=1;X-TITLE=340. Sk.\\\\n16235 Bursa\\\\nNilüfer Türkiye
 :geo:40.221585,28.908668`,
        calendarLocation: '340. Sk.\\n16235 Bursa\\nNilüfer Türkiye'
    },
    {
        name: 'Sandalcı',
        googleUrl: 'https://maps.app.goo.gl/weS8AkcrNLbQJiGz9',
        appleUrl: 'https://maps.apple.com/?address=Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=11485684178102406065&ll=40.213232,28.928199&lsp=9902&q=Sandalc%C4%B1%20Hal%C4%B1%20Saha',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAES2AEIrk0Q
 sZf58P+c1rKfARoSCQ99dytLG0RAEeWub3Ge7TxAIikKCFTDvHJraXllEgJUUhoFQnVyc2Eq
 CE5pbMO8ZmVyMghOaWzDvGZlcioUU2FuZGFsY8SxIEhhbMSxIFNhaGEyDk5pbMO8ZmVyIEJ1
 cnNhMghUw7xya2l5ZTgvUAFaVQolCLGX+fD/nNaynwESEgkPfXcrSxtEQBHlrm9xnu08QBiu
 TZADAaIfKwixl/nw/5zWsp8BGh4KFFNhbmRhbGPEsSBIYWzEsSBTYWhhEAAqAnRyQAA=;X-A
 PPLE-RADIUS=141.1748852422124;X-APPLE-REFERENCEFRAME=1;X-TITLE="Sandalcı
  Halı Saha\\nNilüfer Bursa, Türkiye":geo:40.213231,28.928199`,
        calendarLocation: 'Sandalcı Halı Saha\\nNilüfer Bursa\\, Türkiye'
    },
    {
        name: 'Hüdavendigar',
        googleUrl: 'https://maps.app.goo.gl/NKnayquMn8Ydxxog6',
        appleUrl: 'https://maps.apple.com/?address=H%C3%BCdavendigar%20Park%C4%B1%20%C4%B0%C3%A7i%20Yolu,%2016060%20Osmangazi%20Bursa,%20T%C3%BCrkiye&auid=10891461022698403700&ll=40.200231,29.002541&lsp=9902&q=Korkut%20Hal%C4%B1%20Saha',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAES7wIIrk0Q
 9O7N94PDj5OXARoSCcXRCy2hGURAEf5hS4+mAD1AIp0BCghUw7xya2l5ZRICVFIaBUJ1cnNh
 KglPc21hbmdhemkyCU9zbWFuZ2F6aToFMTYwNjBCCMOHZWtpcmdlUh9Iw7xkYXZlbmRpZ2Fy
 IFBhcmvEsSDEsMOnaSBZb2x1Yh9Iw7xkYXZlbmRpZ2FyIFBhcmvEsSDEsMOnaSBZb2x1igEI
 w4dla2lyZ2WKARFIw7xkYXZlbmRpZ2FyIE1oLioRS29ya3V0IEhhbMSxIFNhaGEyH0jDvGRh
 dmVuZGlnYXIgUGFya8SxIMSww6dpIFlvbHUyFTE2MDYwIE9zbWFuZ2F6aSBCdXJzYTIIVMO8
 cmtpeWU4L1ABWlIKJQj07s33g8OPk5cBEhIJxdELLaEZREAR/mFLj6YAPUAYrk2QAwGiHygI
 9O7N94PDj5OXARobChFLb3JrdXQgSGFsxLEgU2FoYRAAKgJ0ckAA;X-APPLE-RADIUS=141.
 1748850272095;X-APPLE-REFERENCEFRAME=1;X-TITLE="Korkut Halı Saha\\nHüdave
 ndigar Parkı İçi Yolu, 16060 Osmangazi Bursa, Türkiye":geo:40.200231,29.
 002541`,
        calendarLocation: 'Korkut Halı Saha\\nHüdavendigar Parkı İçi Yolu\\, 16060 Osmangazi\n' +
            '  Bursa\\, Türkiye'
    },
    {
        name: 'Galatasaray Özlüce',
        googleUrl: 'https://maps.app.goo.gl/L35T1Saqi885Cz9n7',
        appleUrl: 'https://maps.apple.com/?address=Levent%20Sk.%206,%2016250%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=14911890432876202952&ll=40.247388,28.906610&lsp=9902&q=Hal%C4%B1%20Saha',
        xAppleLocation: `VALUE=URI;X-ADDRESS=Levent Sk. 6\\\\n16250 Bur
 sa\\\\nNilüfer Türkiye;X-APPLE-ABUID=Halısaha (Galatasaray Özlüce) - Diğer
 ;X-APPLE-MAPKIT-HANDLE=CAESuAII2TIaEgkTSIld2x9EQBEqqRPQROg8QCK0AQoIVMO8c
 mtpeWUSAlRSGgVCdXJzYSoITmlsw7xmZXIyCE5pbMO8ZmVyOgUxNjI1MEIRRG/En2Fua8O2e
 SBLw7Z5w7xSCkxldmVudCBTay5aATZiDExldmVudCBTay4gNnItRGluaSBFxJ9pdGltIEvDv
 GxsaXllc2kgSGFmxLF6bMSxa0t1cmFuIEt1cnN1igERRG/En2Fua8O2eSBLw7Z5w7yKAQ5Eb
 8SfYW5rw7Z5IE1oLioMTGV2ZW50IFNrLiA2MgxMZXZlbnQgU2suIDYyFDE2MjUwIE5pbMO8Z
 mVyIEJ1cnNhMghUw7xya2l5ZTg5QABQAVomCiQSEgkTSIld2x9EQBEqqRPQROg8QBjZMiD0q
 tSGzcvdhSiQAwE=;X-APPLE-RADIUS=70.58732581279331;X-APPLE-REFERENCEFRAME=
 1;X-TITLE=Levent Sk. 6\\\\n16250 Bursa\\\\nNilüfer Türkiye:geo:40.248882,28.
 907300`,
        calendarLocation: 'Levent Sk. 6\\n16250 Bursa\\nNilüfer Türkiye'
    },
    {
        name: 'Vitamin',
        googleUrl: 'https://maps.app.goo.gl/q3qQsZ4munieVxja7',
        appleUrl: 'https://maps.apple.com/?address=46.%20Sk.%201%E2%80%9329,%2016270%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=16935313049223439769&ll=40.208569,28.938554&lsp=9902&q=Vitamin%20Hal%C4%B1%20Saha',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAESuQIIrk0Q
 mcuA2NuvlIPrARoSCc76lGOyGkRAEa2HLxNF8DxAIngKCFTDvHJraXllEgJUUhoFQnVyc2Eq
 CE5pbMO8ZmVyMghOaWzDvGZlcjoFMTYyNzBCCUVydHXEn3J1bFIHNDYuIFNrLloGMeKAkzI5
 Yg40Ni4gU2suIDHigJMyOYoBCUVydHXEn3J1bIoBDcOcw6dldmxlciBNaC4qElZpdGFtaW4g
 SGFsxLEgU2FoYTIONDYuIFNrLiAx4oCTMjkyFDE2MjcwIE5pbMO8ZmVyIEJ1cnNhMghUw7xy
 a2l5ZTgvUAFaUwolCJnLgNjbr5SD6wESEgnO+pRjshpEQBGthy8TRfA8QBiuTZADAaIfKQiZ
 y4DY26+Ug+sBGhwKElZpdGFtaW4gSGFsxLEgU2FoYRAAKgJ0ckAA;X-APPLE-RADIUS=141.
 1748851649402;X-APPLE-REFERENCEFRAME=1;X-TITLE="Vitamin Halı Saha\\n46. S
 k. 1–29, 16270 Nilüfer Bursa, Türkiye":geo:40.208569,28.938554`,
        calendarLocation: 'Vitamin Halı Saha\\n46. Sk. 1–29\\, 16270 Nilüfer Bursa\\, Türkiye'
    },
    {
        name: 'Galatasaray',
        googleUrl: 'https://maps.app.goo.gl/4gbCxTQofaKKVHEC7',
        appleUrl: 'https://maps.apple.com/?address=Kaz%C4%B1m%20Karabekir/180.%20Cd.%2010,%2016265%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=2497846863891384065&ll=40.193414,28.992476&lsp=9902&q=Galatasaray%20Futbol%20Okulu',
        xAppleLocation: `VALUE=URI;X-APPLE-RADIUS=70.67103202640418;X
 -APPLE-REFERENCEFRAME=1;X-TITLE=Kazım Karabekir/180. Cd. 10\\\\n16265 Burs
 a\\\\nNilüfer Türkiye:geo:40.193414,28.992476`,
        calendarLocation: 'Kazım Karabekir/180. Cd. 10\\n16265 Bursa\\nNilüfer Türkiye'
    },
    {
        name: 'Dikkaldırım',
        googleUrl: 'https://maps.app.goo.gl/eBuarwu3uJk4Z9246',
        appleUrl: 'https://maps.apple.com/?address=3.%20Nil%C3%BCfer%20Cd.%203,%2016060%20Osmangazi%20Bursa,%20T%C3%BCrkiye&auid=14909712082907719928&ll=40.195992,28.998150&lsp=9902&q=H%C3%BCdavendigar%20Dikkald%C4%B1r%C4%B1m%20Spor%20Tesisleri',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAES8QIIrk0Q
 +NHBqM+E/PTOARoSCYkjD0QWGURAEZ2AJsKG/zxAInwKCFTDvHJraXllEgJUUhoFQnVyc2Eq
 CU9zbWFuZ2F6aTIJT3NtYW5nYXppOgUxNjA2MEIIw4dla2lyZ2VSDzMuIE5pbMO8ZmVyIENk
 LloBM2IRMy4gTmlsw7xmZXIgQ2QuIDOKAQjDh2VraXJnZYoBC0RvYnVyY2EgTWguKipIw7xk
 YXZlbmRpZ2FyIERpa2thbGTEsXLEsW0gU3BvciBUZXNpc2xlcmkyETMuIE5pbMO8ZmVyIENk
 LiAzMhUxNjA2MCBPc21hbmdhemkgQnVyc2EyCFTDvHJraXllOC9QAVprCiUI+NHBqM+E/PTO
 ARISCYkjD0QWGURAEZ2AJsKG/zxAGK5NkAMBoh9BCPjRwajPhPz0zgEaNAoqSMO8ZGF2ZW5k
 aWdhciBEaWtrYWxkxLFyxLFtIFNwb3IgVGVzaXNsZXJpEAAqAnRyQAA=;X-APPLE-RADIUS=
 589.9940453883523;X-APPLE-REFERENCEFRAME=1;X-TITLE="Hüdavendigar Dikkald
 ırım Spor Tesisleri\\n3. Nilüfer Cd. 3, 16060 Osmangazi Bursa, Türkiye":g
 eo:40.195992,28.998150`,
        calendarLocation: 'Hüdavendigar Dikkaldırım Spor Tesisleri\\n3. Nilüfer Cd. 3\\, 160\n' +
            ' 60 Osmangazi Bursa\\, Türkiye'
    },
    {
        name: 'Jimer',
        googleUrl: 'https://maps.app.goo.gl/X5o3aSKpteLyhVLb6',
        appleUrl: 'https://maps.apple.com/?address=Mihrapl%C4%B1%20Cd.%2010A,%2016265%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=11751459912347828554&ll=40.206087,28.994256&lsp=9902&q=Wembley%20Hal%C4%B1%20Saha',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAESwAIIrk0Q
 yoLxnfTQ5IqjARoSCWmSswthGkRAEZFco4qH/jxAInwKCFTDvHJraXllEgJUUhoFQnVyc2Eq
 CE5pbMO8ZmVyMghOaWzDvGZlcjoFMTYyNjVCCUJlxZ9ldmxlclINTWlocmFwbMSxIENkLloD
 MTBBYhFNaWhyYXBsxLEgQ2QuIDEwQYoBCUJlxZ9ldmxlcooBC09kdW5sdWsgTWguKhJXZW1i
 bGV5IEhhbMSxIFNhaGEyEU1paHJhcGzEsSBDZC4gMTBBMhQxNjI2NSBOaWzDvGZlciBCdXJz
 YTIIVMO8cmtpeWU4L1ABWlMKJQjKgvGd9NDkiqMBEhIJaZKzC2EaREARkVyjiof+PEAYrk2Q
 AwGiHykIyoLxnfTQ5IqjARocChJXZW1ibGV5IEhhbMSxIFNhaGEQACoCdHJAAA==;X-APPLE
 -RADIUS=141.1748851221922;X-APPLE-REFERENCEFRAME=1;X-TITLE="Wembley Halı
  Saha\\nMihraplı Cd. 10A, 16265 Nilüfer Bursa, Türkiye":geo:40.206087,28.
 994256`,
        calendarLocation: 'Wembley Halı Saha\\nMihraplı Cd. 10A\\, 16265 Nilüfer Bursa\\, Tür\n' +
            ' kiye'
    },
    {
        name: 'Şükrü Şankaya',
        googleUrl: 'https://maps.app.goo.gl/f2m8bKGfzS6BekFHA',
        appleUrl: 'https://maps.apple.com/?address=Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=8709980759923149473&ll=40.218131,28.889067&lsp=9902&q=%C5%9E%C3%BCkr%C3%BC%20%C5%9Eankaya%20Hal%C4%B1saha',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAES4wEIrk0Q
 oZXT3airhPB4GhIJyV5KuOsbREARQPJz6JnjPEAiKQoIVMO8cmtpeWUSAlRSGgVCdXJzYSoI
 Tmlsw7xmZXIyCE5pbMO8ZmVyKhvFnsO8a3LDvCDFnmFua2F5YSBIYWzEsXNhaGEyDk5pbMO8
 ZmVyIEJ1cnNhMghUw7xya2l5ZTgvUAFaWgokCKGV092oq4TweBISCcleSrjrG0RAEUDyc+iZ
 4zxAGK5NkAMBoh8xCKGV092oq4TweBolChvFnsO8a3LDvCDFnmFua2F5YSBIYWzEsXNhaGEQ
 ACoCdHJAAA==;X-APPLE-RADIUS=141.1748853250835;X-APPLE-REFERENCEFRAME=1;X
 -TITLE="Şükrü Şankaya Halısaha\\nNilüfer Bursa, Türkiye":geo:40.218131,28
 .889067`,
        calendarLocation: 'Şükrü Şankaya Halısaha\\nNilüfer Bursa\\, Türkiye'
    },
    {
        name: 'Karafatma',
        googleUrl: 'https://maps.app.goo.gl/YsyrRNsmu9bJ5Pkf8',
        appleUrl: 'https://maps.apple.com/?address=Bilginler%20Cd.%2081,%2016265%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=13548917118078783685&ll=40.206893,28.972391&lsp=9902&q=ESAS%20Be%C5%9Fevler%20Spor%20Tesisi',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAESywIIrk0Q
 xaGu0taK24O8ARoSCbtiRnh7GkRAEbvs153u+DxAIngKCFTDvHJraXllEgJUUhoFQnVyc2Eq
 CE5pbMO8ZmVyMghOaWzDvGZlcjoFMTYyNjVCCUJlxZ9ldmxlclINQmlsZ2lubGVyIENkLloC
 ODFiEEJpbGdpbmxlciBDZC4gODGKAQlCZcWfZXZsZXKKAQlLb25hayBNaC4qGkVTQVMgQmXF
 n2V2bGVyIFNwb3IgVGVzaXNpMhBCaWxnaW5sZXIgQ2QuIDgxMhQxNjI2NSBOaWzDvGZlciBC
 dXJzYTIIVMO8cmtpeWU4L1ABWlsKJQjFoa7S1orbg7wBEhIJu2JGeHsaREARu+zXne74PEAY
 rk2QAwGiHzEIxaGu0taK24O8ARokChpFU0FTIEJlxZ9ldmxlciBTcG9yIFRlc2lzaRAAKgJ0
 ckAA;X-APPLE-RADIUS=160.395605193686;X-APPLE-REFERENCEFRAME=1;X-TITLE="E
 SAS Beşevler Spor Tesisi\\nBilginler Cd. 81, 16265 Nilüfer Bursa, Türkiye
 ":geo:40.206893,28.972391`,
        calendarLocation: 'ESAS Beşevler Spor Tesisi\\nBilginler Cd. 81\\, 16265 Nilüfer Bur\n' +
            ' sa\\, Türkiye'
    },
    {
        name: 'Özlüce Timsaha',
        googleUrl: 'https://maps.app.goo.gl/MTQc4ayzi1rA6kfY8',
        appleUrl: 'https://maps.apple.com/?address=Emek%20Sk.%2013,%2016235%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=1581426318664967868&ll=40.214641,28.917137&lsp=9902&q=Timsaha%20%C3%96zl%C3%BCce',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAESqQIIrk0Q
 vM3q07rblvkVGhIJ1PIDV3kbREARRvUxesnqPEAicgoIVMO8cmtpeWUSAlRSGgVCdXJzYSoI
 Tmlsw7xmZXIyCE5pbMO8ZmVyOgUxNjIzNUIJRXJ0dcSfcnVsUghFbWVrIFNrLloCMTNiC0Vt
 ZWsgU2suIDEzigEJRXJ0dcSfcnVsigENRXJ0dcSfcnVsIE1oLioQVGltc2FoYSDDlnpsw7xj
 ZTILRW1layBTay4gMTMyFDE2MjM1IE5pbMO8ZmVyIEJ1cnNhMghUw7xya2l5ZTgvUAFaTwok
 CLzN6tO625b5FRISCdTyA1d5G0RAEUb1MXrJ6jxAGK5NkAMBoh8mCLzN6tO625b5FRoaChBU
 aW1zYWhhIMOWemzDvGNlEAAqAnRyQAA=;X-APPLE-RADIUS=141.1748852639307;X-APPL
 E-REFERENCEFRAME=1;X-TITLE="Timsaha Özlüce\\nEmek Sk. 13, 16235 Nilüfer B
 ursa, Türkiye":geo:40.214641,28.917137`,
        calendarLocation: 'Timsaha Özlüce\\nEmek Sk. 13\\, 16235 Nilüfer Bursa\\, Türkiye'
    },
    {
        name: 'Fenerbahçe',
        googleUrl: 'https://maps.app.goo.gl/PMiG35sMrnAvMJ167',
        appleUrl: 'https://maps.apple.com/?address=Odunluk%20Cd.%204,%2016265%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=10207336617334154065&ll=40.203698,28.996648&lsp=9902&q=Bursa%20Fenerbah%C3%A7e%20Futbol%20Okulu',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAESzAIIrk0Q
 0cao2KnS79ONARoSCVwhrMYSGkRAEbKfxVIk/zxAInQKCFTDvHJraXllEgJUUhoFQnVyc2Eq
 CE5pbMO8ZmVyMghOaWzDvGZlcjoFMTYyNjVCCUJlxZ9ldmxlclILT2R1bmx1ayBDZC5aATRi
 DU9kdW5sdWsgQ2QuIDSKAQlCZcWfZXZsZXKKAQtPZHVubHVrIE1oLioeQnVyc2EgRmVuZXJi
 YWjDp2UgRnV0Ym9sIE9rdWx1Mg1PZHVubHVrIENkLiA0MhQxNjI2NSBOaWzDvGZlciBCdXJz
 YTIIVMO8cmtpeWU4L1ABWl8KJQjRxqjYqdLv040BEhIJXCGsxhIaREARsp/FUiT/PEAYrk2Q
 AwGiHzUI0cao2KnS79ONARooCh5CdXJzYSBGZW5lcmJhaMOnZSBGdXRib2wgT2t1bHUQACoC
 dHJAAA==;X-APPLE-RADIUS=141.1748850849196;X-APPLE-REFERENCEFRAME=1;X-TIT
 LE="Bursa Fenerbahçe Futbol Okulu\\nOdunluk Cd. 4, 16265 Nilüfer Bursa, T
 ürkiye":geo:40.203698,28.996648`,
        calendarLocation: 'Bursa Fenerbahçe Futbol Okulu\\nOdunluk Cd. 4\\, 16265 Nilüfer Bu\n' +
            ' rsa\\, Türkiye'
    },
    {
        name: 'Trabzonspor',
        googleUrl: 'https://maps.app.goo.gl/cKLeTKvAZk4FLgp17',
        appleUrl: 'https://maps.apple.com/?address=3.%20Nil%C3%BCfer%20Cd.%203,%2016060%20Osmangazi%20Bursa,%20T%C3%BCrkiye&auid=18279056787880904392&ll=40.195413,28.997244&lsp=9902&q=Mihrapl%C4%B1%20Hal%C4%B1saha',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAESwwIIrk0Q
 yI3W9tSpkNb9ARoSCXWau0wDGURAETMlSFtL/zxAInwKCFTDvHJraXllEgJUUhoFQnVyc2Eq
 CU9zbWFuZ2F6aTIJT3NtYW5nYXppOgUxNjA2MEIIw4dla2lyZ2VSDzMuIE5pbMO8ZmVyIENk
 LloBM2IRMy4gTmlsw7xmZXIgQ2QuIDOKAQjDh2VraXJnZYoBC0RvYnVyY2EgTWguKhNNaWhy
 YXBsxLEgSGFsxLFzYWhhMhEzLiBOaWzDvGZlciBDZC4gMzIVMTYwNjAgT3NtYW5nYXppIEJ1
 cnNhMghUw7xya2l5ZTgvUAFaVAolCMiN1vbUqZDW/QESEgl1mrtMAxlEQBEzJUhbS/88QBiu
 TZADAaIfKgjIjdb21KmQ1v0BGh0KE01paHJhcGzEsSBIYWzEsXNhaGEQACoCdHJAAA==;X-A
 PPLE-RADIUS=580.3006506033278;X-APPLE-REFERENCEFRAME=1;X-TITLE="Mihraplı
  Halısaha\\n3. Nilüfer Cd. 3, 16060 Osmangazi Bursa, Türkiye":geo:40.1954
 13,28.997244`,
        calendarLocation: 'Mihraplı Halısaha\\n3. Nilüfer Cd. 3\\, 16060 Osmangazi Bursa\\, T\n' +
            ' ürkiye'
    },
    {
        name: 'Asya',
        googleUrl: 'https://maps.app.goo.gl/7VLP2n7Yj5gekCCY8',
        appleUrl: 'https://maps.apple.com/?address=Oyun%20Engel%20Tan%C4%B1maz%20Park%C4%B1,%20Oyun%20Engel%20Tan%C4%B1maz%20Park%C4%B1%20%C4%B0%C3%A7i%20Yolu,%2016200%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&ll=40.216679,28.989074&q=Eklenmi%C5%9F%20%C4%B0%C4%9Fne',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAESjgMIrk0Q
 xLSFleCS8bOwARoSCRiXqrTFG0RAEdxJRPgX/TxAIqUBCghUw7xya2l5ZRICVFIaBUJ1cnNh
 KghOaWzDvGZlcjIITmlsw7xmZXI6BTE2MjAwQgnEsGhzYW5peWVSJU95dW4gRW5nZWwgVGFu
 xLFtYXogUGFya8SxIMSww6dpIFlvbHViJU95dW4gRW5nZWwgVGFuxLFtYXogUGFya8SxIMSw
 w6dpIFlvbHWKAQnEsGhzYW5peWWKAQ3EsGhzYW5peWUgTWguKhpPeXVuIEVuZ2VsIFRhbsSx
 bWF6IFBhcmvEsTIlT3l1biBFbmdlbCBUYW7EsW1heiBQYXJrxLEgxLDDp2kgWW9sdTIUMTYy
 MDAgTmlsw7xmZXIgQnVyc2EyCFTDvHJraXllOC9QAVpbCiUIxLSFleCS8bOwARISCRiXqrTF
 G0RAEdxJRPgX/TxAGK5NkAMBoh8xCMS0hZXgkvGzsAEaJAoaT3l1biBFbmdlbCBUYW7EsW1h
 eiBQYXJrxLEQACoCdHJAAA==;X-APPLE-RADIUS=145.8557254977292;X-APPLE-REFERE
 NCEFRAME=1;X-TITLE="Oyun Engel Tanımaz Parkı\\nOyun Engel Tanımaz Parkı İ
 çi Yolu, 16200 Nilüfer Bursa, Türkiye":geo:40.216971,28.988647`,
        calendarLocation: 'Oyun Engel Tanımaz Parkı\\nOyun Engel Tanımaz Parkı İçi Yolu\\, 1\n' +
            ' 6200 Nilüfer Bursa\\, Türkiye'
    },
    {
        name: 'Olimpik',
        googleUrl: 'https://maps.app.goo.gl/XtGpawxLtaLr3q3Q8',
        appleUrl: 'https://maps.apple.com/?address=Mudanya%20Cd.%20158,%2016940%20Mudanya%20Bursa,%20T%C3%BCrkiye&auid=16112852628900076155&ll=40.308404,28.937733&lsp=9902&q=Olimpik%20Marmara%20Hal%C4%B1%20Saha',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAESxwIIrk0Q
 +7S7/orDls7fARoSCVH6Qsh5J0RAEZlfckgP8DxAInYKCFTDvHJraXllEgJUUhoFQnVyc2Eq
 B011ZGFueWEyB011ZGFueWE6BTE2OTQwQhDDh2HEn3LEscWfYW4gTWguUgtNdWRhbnlhIENk
 LloDMTU4Yg9NdWRhbnlhIENkLiAxNTiKARDDh2HEn3LEscWfYW4gTWguKhpPbGltcGlrIE1h
 cm1hcmEgSGFsxLEgU2FoYTIPTXVkYW55YSBDZC4gMTU4MhMxNjk0MCBNdWRhbnlhIEJ1cnNh
 MghUw7xya2l5ZTgvUAFaWwolCPu0u/6Kw5bO3wESEglR+kLIeSdEQBGZX3JID/A8QBiuTZAD
 AaIfMQj7tLv+isOWzt8BGiQKGk9saW1waWsgTWFybWFyYSBIYWzEsSBTYWhhEAAqAnRyQAA=
 ;X-APPLE-RADIUS=422.4022875860261;X-APPLE-REFERENCEFRAME=1;X-TITLE="Olim
 pik Marmara Halı Saha\\nMudanya Cd. 158, 16940 Mudanya Bursa, Türkiye":ge
 o:40.308404,28.937733`,
        calendarLocation: 'Olimpik Marmara Halı Saha\\nMudanya Cd. 158\\, 16940 Mudanya Burs\n' +
            ' a\\, Türkiye'
    },
    {
        name: 'Soğukkuyu',
        googleUrl: 'https://maps.app.goo.gl/NBgfWKwuZANThkRe8',
        appleUrl: 'https://maps.apple.com/?address=So%C4%9Fukkuyu%20Cd.%2011,%2016160%20Osmangazi%20Bursa,%20T%C3%BCrkiye&auid=13941616684102419106&ll=40.213974,29.009026&lsp=9902&q=So%C4%9Fukkuyu%20Kamil%20Saker%20Spor%20Tesisi',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAES7wIIrk0Q
 ooXWlKLQpL3BARoSCd8YAoBjG0RAEU7QJodPAj1AIokBCghUw7xya2l5ZRICVFIaBUJ1cnNh
 KglPc21hbmdhemkyCU9zbWFuZ2F6aToFMTYxNjBCDUJhxJ9sYXJiYcWfxLFSDlNvxJ91a2t1
 eXUgQ2QuWgIxMWIRU2/En3Vra3V5dSBDZC4gMTGKAQ1CYcSfbGFyYmHFn8SxigEOU2/En3Vr
 a3V5dSBNaC4qIlNvxJ91a2t1eXUgS2FtaWwgU2FrZXIgU3BvciBUZXNpc2kyEVNvxJ91a2t1
 eXUgQ2QuIDExMhUxNjE2MCBPc21hbmdhemkgQnVyc2EyCFTDvHJraXllOC9QAVpjCiUIooXW
 lKLQpL3BARISCd8YAoBjG0RAEU7QJodPAj1AGK5NkAMBoh85CKKF1pSi0KS9wQEaLAoiU2/E
 n3Vra3V5dSBLYW1pbCBTYWtlciBTcG9yIFRlc2lzaRAAKgJ0ckAA;X-APPLE-RADIUS=141.
 1748852532942;X-APPLE-REFERENCEFRAME=1;X-TITLE="Soğukkuyu Kamil Saker Sp
 or Tesisi\\nSoğukkuyu Cd. 11, 16160 Osmangazi Bursa, Türkiye":geo:40.2139
 74,29.009026`,
        calendarLocation: 'Soğukkuyu Kamil Saker Spor Tesisi\\nSoğukkuyu Cd. 11\\, 16160 Osm\n' +
            ' angazi Bursa\\, Türkiye'
    },
    {
        name: 'Çamlıca',
        googleUrl: 'https://maps.app.goo.gl/aNuYdQiMWheoJPz68',
        appleUrl: 'https://maps.apple.com/?address=Zafer%20Cd.%2067/1,%2016260%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=12725208065590745105&ll=40.191603,28.979154&lsp=9902&q=%C3%87aml%C4%B1ca%20Hal%C4%B1%20Saha%20Tesisleri',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAES0QIIrk0Q
 kbDj04iqwcywARoSCWJodXKGGERAEWK/J9ap+jxAIngKCFTDvHJraXllEgJUUhoFQnVyc2Eq
 CE5pbMO8ZmVyMghOaWzDvGZlcjoFMTYyNjBCCUJlxZ9ldmxlclIJWmFmZXIgQ2QuWgQ2Ny8x
 Yg5aYWZlciBDZC4gNjcvMYoBCUJlxZ9ldmxlcooBDcOHYW1sxLFjYSBNaC4qHsOHYW1sxLFj
 YSBIYWzEsSBTYWhhIFRlc2lzbGVyaTIOWmFmZXIgQ2QuIDY3LzEyFDE2MjYwIE5pbMO8ZmVy
 IEJ1cnNhMghUw7xya2l5ZTgvUAFaXwolCJGw49OIqsHMsAESEgliaHVyhhhEQBFivyfWqfo8
 QBiuTZADAaIfNQiRsOPTiKrBzLABGigKHsOHYW1sxLFjYSBIYWzEsSBTYWhhIFRlc2lzbGVy
 aRAAKgJ0ckAA;X-APPLE-RADIUS=141.1748809814453;X-APPLE-REFERENCEFRAME=0;X
 -TITLE="Çamlıca Halı Saha Tesisleri\\nZafer Cd. 67/1, 16260 Nilüfer Bursa
 , Türkiye":geo:40.191603,28.979154`,
        calendarLocation: 'Çamlıca Halı Saha Tesisleri\\nZafer Cd. 67/1\\, 16260 Nilüfer Bur\n' +
            ' sa\\, Türkiye'
    },
    {
        name: 'Mudanya Timsaha',
        googleUrl: 'https://maps.app.goo.gl/RgqHkRmD65V6SAaQ7',
        appleUrl: 'https://maps.apple.com/?address=2002.%20Sk.,%2016940%20Mudanya%20Bursa,%20T%C3%BCrkiye&auid=12554345338857972108&ll=40.291477,28.938139&lsp=9902&q=T%C4%B0MSAHA',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAESqQIIrk0Q
 jMPXsZ7S/5yuARoSCWbKPRNQJURAEeDDgIAQ8DxAIn8KCFTDvHJraXllEgJUUhoFQnVyc2Eq
 B011ZGFueWEyB011ZGFueWE6BTE2OTQwQgxOaWzDvGZlcmvDtnlSC011ZGFueWEgQ2QuWgI1
 NmIOTXVkYW55YSBDZC4gNTaKAQxOaWzDvGZlcmvDtnmKARDDh2HEn3LEscWfYW4gTWguKgdU
 aW1zYWhhMg5NdWRhbnlhIENkLiA1NjITMTY5NDAgTXVkYW55YSBCdXJzYTIIVMO8cmtpeWU4
 L1ABWkgKJQiMw9exntL/nK4BEhIJZso9E1AlREAR4MOAgBDwPEAYrk2QAwGiHx4IjMPXsZ7S
 /5yuARoRCgdUaW1zYWhhEAAqAnRyQAA=;X-APPLE-RADIUS=141.1748865399541;X-APPL
 E-REFERENCEFRAME=1;X-TITLE="Timsaha\\nMudanya Cd. 56, 16940 Mudanya Bursa
 , Türkiye":geo:40.291506,28.937752`,
        calendarLocation: 'Timsaha\\nMudanya Cd. 56\\, 16940 Mudanya Bursa\\, Türkiye'
    },
    {
        name: 'Kültürpark Timsaha',
        googleUrl: 'https://maps.app.goo.gl/SimAGh63NoPTQygz6',
        appleUrl: 'https://maps.apple.com/?address=Doktor%20R%C3%BC%C5%9Ft%C3%BC%20Burlu%20Cd.%2010,%2016150%20Osmangazi%20Bursa,%20T%C3%BCrkiye&auid=16847266177975834823&ll=40.198232,29.041377&lsp=9902&q=Alt%C4%B1n%20Ceylan%20Timsaha',
        xAppleLocation: `VALUE=URI;X-APPLE-RADIUS=141.5366116794926;X
 -APPLE-REFERENCEFRAME=0;X-TITLE="Altın Ceylan Timsaha\\nDoktor Rüştü Burl
 u Cd. 10, 16150 Osmangazi Bursa, Türkiye":geo:40.198045,29.041083`,
        calendarLocation: 'Altın Ceylan Timsaha\\nDoktor Rüştü Burlu Cd. 10\\, 16150 Osmanga\n' +
            ' zi Bursa\\, Türkiye'
    },
    {
        name: 'Park Akademi',
        googleUrl: 'https://maps.app.goo.gl/p29dyuG2KaPyoXhCA',
        appleUrl: 'https://maps.apple.com/?address=H%C3%BCdavendigar%20Park%C4%B1%20%C4%B0%C3%A7i%20Yolu,%2016265%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=9582832919972759011&ll=40.201712,28.996809&lsp=9902&q=Hal%C4%B1%20Saha',
        xAppleLocation: `VALUE=URI;X-APPLE-RADIUS=70.67110259352592;X
 -APPLE-REFERENCEFRAME=1;X-TITLE=Hüdavendigar Parkı İçi Yolu\\\\n16265 Burs
 a\\\\nNilüfer Türkiye:geo:40.202070,28.998182`,
        calendarLocation: 'Hüdavendigar Parkı İçi Yolu\\n16265 Bursa\\nNilüfer Türkiye'
    },
    {
        name: 'Çalı',
        googleUrl: 'https://maps.app.goo.gl/ctHq1UYPFSC6jsK77',
        appleUrl: 'https://maps.apple.com/?address=Kanal%20Cd.%209,%2016275%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=17566516412372877532&ll=40.178750,28.921795&lsp=9902&q=Egemen%20Spor%20Tesisleri',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAEStQIIrk0Q
 3IG45LCzs+TzARoSCXsUrkfhFkRAEced0sH66zxAInEKCFTDvHJraXllEgJUUhoFQnVyc2Eq
 CE5pbMO8ZmVyMghOaWzDvGZlcjoFMTYyNzVCBsOHYWzEsVIJS2FuYWwgQ2QuWgE5YgtLYW5h
 bCBDZC4gOYoBBsOHYWzEsYoBCsOHYWzEsSBNaC6aAQUIABIBMSoVRWdlbWVuIFNwb3IgVGVz
 aXNsZXJpMgtLYW5hbCBDZC4gOTIUMTYyNzUgTmlsw7xmZXIgQnVyc2EyCFTDvHJraXllOC9Q
 AVpWCiUI3IG45LCzs+TzARISCXsUrkfhFkRAEced0sH66zxAGK5NkAMBoh8sCNyBuOSws7Pk
 8wEaHwoVRWdlbWVuIFNwb3IgVGVzaXNsZXJpEAAqAnRyQAA=;X-APPLE-RADIUS=141.1748
 846706665;X-APPLE-REFERENCEFRAME=1;X-TITLE="Egemen Spor Tesisleri\\nKanal
  Cd. 9, 16275 Nilüfer Bursa, Türkiye":geo:40.178750,28.921795`,
        calendarLocation: 'Egemen Spor Tesisleri\\nKanal Cd. 9\\, 16275 Nilüfer Bursa\\, Türk\n' +
            ' iye'
    },
    {
        name: 'Görükle',
        googleUrl: 'https://maps.app.goo.gl/S9tu8V8AkFG9MDnK9',
        appleUrl: 'https://maps.apple.com/?address=Tercan%20Sk.%202A,%2016240%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=401403905846944860&ll=40.218530,28.845183&lsp=9902&q=G%C3%B6r%C3%BCkle%20Oru%C3%A7%20Arena',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAESvwIIrk0Q
 3MjYm5zXhMkFGhIJ8piByvgbREARmiLA6V3YPEAifAoIVMO8cmtpeWUSAlRSGgVCdXJzYSoI
 Tmlsw7xmZXIyCE5pbMO8ZmVyOgUxNjI0MEILRHVtbHVwxLFuYXJSClRlcmNhbiBTay5aAjJB
 Yg1UZXJjYW4gU2suIDJBigELRHVtbHVwxLFuYXKKAQ9EdW1sdXDEsW5hciBNaC4qFUfDtnLD
 vGtsZSBPcnXDpyBBcmVuYTINVGVyY2FuIFNrLiAyQTIUMTYyNDAgTmlsw7xmZXIgQnVyc2Ey
 CFTDvHJraXllOC9QAVpUCiQI3MjYm5zXhMkFEhIJ8piByvgbREARmiLA6V3YPEAYrk2QAwGi
 HysI3MjYm5zXhMkFGh8KFUfDtnLDvGtsZSBPcnXDpyBBcmVuYRAAKgJ0ckAA;X-APPLE-RAD
 IUS=141.1748853320861;X-APPLE-REFERENCEFRAME=1;X-TITLE="Görükle Oruç Are
 na\\nTercan Sk. 2A, 16240 Nilüfer Bursa, Türkiye":geo:40.218530,28.845183`,
        calendarLocation: 'Görükle Oruç Arena\\nTercan Sk. 2A\\, 16240 Nilüfer Bursa\\, Türki\n' +
            ' ye'
    },
    {
        name: 'Hürriyet',
        googleUrl: 'https://maps.app.goo.gl/hEukhHZesCDGgm2d9',
        appleUrl: 'https://maps.apple.com/?address=Necati%20Sezen%20Sk.%205,%2059030%20S%C3%BCleymanpa%C5%9Fa%20Tekirda%C4%9F,%20T%C3%BCrkiye&auid=12615159708468219331&ll=40.991107,27.564005&lsp=9902&q=H%C3%BCrriyet%20Hal%C4%B1%20Saha%20%26%20Cafe',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAES0gIIrk0Q
 jYf58ObMse6VARoSCUJ2gw30HERAEQs/3eXHAD1AIoMBCghUw7xya2l5ZRICVFIaBUJ1cnNh
 KglPc21hbmdhemkyCU9zbWFuZ2F6aToFMTYxNjBCDUJhxJ9sYXJiYcWfxLFSDTEuIEFkYWxl
 dCBDZC5aAjQ0YhAxLiBBZGFsZXQgQ2QuIDQ0igENQmHEn2xhcmJhxZ/EsYoBCkFkYWxldCBN
 aC4qF0h1cnJpeWV0IFNwb3IgVGVzaXNsZXJpMhAxLiBBZGFsZXQgQ2QuIDQ0MhUxNjE2MCBP
 c21hbmdhemkgQnVyc2EyCFTDvHJraXllOC9QAVpYCiUIjYf58ObMse6VARISCUJ2gw30HERA
 EQs/3eXHAD1AGK5NkAMBoh8uCI2H+fDmzLHulQEaIQoXSHVycml5ZXQgU3BvciBUZXNpc2xl
 cmkQACoCdHJAAA==;X-APPLE-RADIUS=147.328297110208;X-APPLE-REFERENCEFRAME=
 1;X-TITLE="Hurriyet Spor Tesisleri\\n1. Adalet Cd. 44, 16160 Osmangazi Bu
 rsa, Türkiye":geo:40.226198,29.003050`,
        calendarLocation: 'Hurriyet Spor Tesisleri\\n1. Adalet Cd. 44\\, 16160 Osmangazi Bur\n' +
            ' sa\\, Türkiye'
    },
    {
        name: 'Ziraat',
        googleUrl: 'https://maps.app.goo.gl/TTJUth2phjaq9XA88',
        appleUrl: 'https://maps.apple.com/?address=1.%20%C4%B0hsaniye%20Cd.%207,%2016160%20Osmangazi%20Bursa,%20T%C3%BCrkiye&auid=7141100465530524598&ll=40.227952,28.990638&lsp=9902&q=Yeni%20Karaman%20Spor%20Tesisleri',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAES4gIIrk0Q
 tqfLypyhko1jGhIJZof4hy0dREARwyy0c5r9PEAijAEKCFTDvHJraXllEgJUUhoFQnVyc2Eq
 CU9zbWFuZ2F6aTIJT3NtYW5nYXppOgUxNjE2MEINQmHEn2xhcmJhxZ/EsVIQMS4gxLBoc2Fu
 aXllIENkLloBN2ISMS4gxLBoc2FuaXllIENkLiA3igENQmHEn2xhcmJhxZ/EsYoBD1llbmlr
 YXJhbWFuIE1oLiobWWVuaSBLYXJhbWFuIFNwb3IgVGVzaXNsZXJpMhIxLiDEsGhzYW5peWUg
 Q2QuIDcyFTE2MTYwIE9zbWFuZ2F6aSBCdXJzYTIIVMO8cmtpeWU4L1ABWloKJAi2p8vKnKGS
 jWMSEglmh/iHLR1EQBHDLLRzmv08QBiuTZADAaIfMQi2p8vKnKGSjWMaJQobWWVuaSBLYXJh
 bWFuIFNwb3IgVGVzaXNsZXJpEAAqAnRyQAA=;X-APPLE-RADIUS=144.2993909867293;X-
 APPLE-REFERENCEFRAME=1;X-TITLE="Yeni Karaman Spor Tesisleri\\n1. İhsaniye
  Cd. 7, 16160 Osmangazi Bursa, Türkiye":geo:40.227952,28.990638`,
        calendarLocation: 'Yeni Karaman Spor Tesisleri\\n1. İhsaniye Cd. 7\\, 16160 Osmangaz\n' +
            ' i Bursa\\, Türkiye'
    },
    {
        name: 'Fethiye',
        googleUrl: 'https://maps.app.goo.gl/ZsAF3EHF4nznyPKE9',
        appleUrl: 'https://maps.apple.com/?address=Top%20Sahas%C4%B1%20Cd.%2015/1,%2016210%20Nil%C3%BCfer%20Bursa,%20T%C3%BCrkiye&auid=16763455133313078428&ll=40.235316,28.973685&lsp=9902&q=Fethiye%20Spor%20Kompleksi',
        xAppleLocation: `VALUE=URI;X-APPLE-MAPKIT-HANDLE=CAESzQIIrk0Q
 nKnM6oi08NHoARoSCd4crtUeHkRAERObj2tD+TxAIn4KCFTDvHJraXllEgJUUhoFQnVyc2Eq
 CE5pbMO8ZmVyMghOaWzDvGZlcjoFMTYyMTBCB0ZldGhpeWVSD1RvcCBTYWhhc8SxIENkLloE
 MTUvMWIUVG9wIFNhaGFzxLEgQ2QuIDE1LzGKAQdGZXRoaXlligELRmV0aGl5ZSBNaC4qFkZl
 dGhpeWUgU3BvciBLb21wbGVrc2kyFFRvcCBTYWhhc8SxIENkLiAxNS8xMhQxNjIxMCBOaWzD
 vGZlciBCdXJzYTIIVMO8cmtpeWU4L1ABWlcKJQicqczqiLTw0egBEhIJ3hyu1R4eREARE5uP
 a0P5PEAYrk2QAwGiHy0InKnM6oi08NHoARogChZGZXRoaXllIFNwb3IgS29tcGxla3NpEAAq
 AnRyQAA=;X-APPLE-RADIUS=142.8846332015152;X-APPLE-REFERENCEFRAME=1;X-TIT
 LE="Fethiye Spor Kompleksi\\nTop Sahası Cd. 15/1, 16210 Nilüfer Bursa, Tü
 rkiye":geo:40.235316,28.973685`,
        calendarLocation: 'Fethiye Spor Kompleksi\\nTop Sahası Cd. 15/1\\, 16210 Nilüfer Bur\n' +
            ' sa\\, Türkiye'
    },
]

export const Jerseys = [
    'iOS Jersey',
    'Chelsea Jersey',
    'Wavy Jersey',
    'Red Jersey',
    '10th Year Jersey',
]

export const WeatherSky = [
    'Night',
    'Daytime',
    'Rain',
    'Snow'
]

export const FootballRoles = [
    'gk', 'df', 'cm', 'fw',
]

export const matchType = {
    previous: 'previous',
    upcoming: 'upcoming',
    live: 'live',
};

export const openWeatherType = {
    forecast: 'forecast',
    weather: 'weather',
};