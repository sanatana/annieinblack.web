import { JsonSongSchema } from '@src/components';

const Copy = () => {
  return (
    <div className="copy">&copy; 2025 Annie in Black</div>
  );
};

const Authors = () => {
  return (
    <div className="author">Lyrics by: Sebastjan Stadler</div>
  );
};

const Songs = ({ slug, addSchema = false }) => {

  if (!slug) {
    return null;
  }

  switch (slug) {
    case 'i-remember':
      return (
        <div>
          <h3>I remember</h3>
          <Authors/>
          <Copy/>
          <div className="dedication">
            For Vesna, Sergei, Uros, Silvia, John C., Malcolm C., and all the loved ones and friends we’ve lost on our journey.
            Though your voices are silent, your presence lingers in every note, every line, and every echo of this song.
          </div>

          I still remember the way you smiled<br/>
          All those moments now lost to time<br/>
          Everything we had, seemed like a dream<br/>
          shattered by the pain and the tears I&apos;ve cried<br/><br/>

          Time may pass, and seasons may change<br/>
          Yet echoes linger, and deep pain remains<br/>
          Through the days and long sleepless nights<br/>
          shattered by the pain, I still call your name<br/><br/>

          Storms may come, and stars may wane<br/>
          and through it all, I still remember you<br/>
          All those days might long be gone<br/>
          but in my dreams, in my dreams you live on<br/><br/>

          Time may pass, but the memories remain<br/>
          Even though you&apos;re gone, I hold on to the pain<br/>
          In the quiet moments, in dead of night<br/>
          in dark shadows, I still see you smile<br/><br/>

          Even though you&apos;re gone, in heavens above<br/>
          years may pass, yet you&apos;re still in my heart<br/>
          A symphony of sorrow - my endless refrain<br/>
          for I&apos;m left behind alone with this pain<br/><br/>

          ...and through it all, I still remember you<br/>
          All those days might long be gone<br/>
          but in my dreams... you live on!!!<br/><br/>

          Storms may come, and stars may wane<br/>
          and through it all, I still remember you<br/>
          All those days might long be gone<br/>
          but in my dreams... you live on<br/><br/>

          You live on.

          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="QSLscmzLzNI"
              title="I remember"
              lyrics={
                `I still remember the way you smiled
All those moments now lost to time
Everything we had, seemed like a dream
Shattered by the pain and the tears I've cried

Time may pass, and seasons may change
Yet echoes linger, and deep pain remains
Through the days and long sleepless nights
Shattered by the pain, I still call your name
 
Storms may come, and stars may wane
and through it all, I still remember you
All those days might long be gone
but in my dreams, in my dreams you live on

Time may pass, but the memories remain
Even though you're gone, I hold on to the pain
In the quiet moments, in dead of night
In dark shadows, I still see you smile

Even though you're gone, in heavens above
years may pass, yet you're still in my heart
A symphony of sorrow - my endless refrain
for I'm left behind alone with this pain

...and through it all, I still remember you
All those days might long be gone
but in my dreams... you live on!!!

Storms may come, and stars may wane
and through it all, I still remember you
All those days might long be gone
but in my dreams... you live on

You live on` }
            />      ) }
        </div>
      );

    case 'hollow': {
      return (
        <div>
          <h3>Hollow</h3>
          <Authors/>
          <Copy/>
          <article>
            When I lay my head to rest<br/>
            Deep whisper calls my name<br/>
            A hollow voice inside my head<br/>
            Silent screams, I can&apos;t escape<br/>
            <br/>
            I pray the night to set me free<br/>
            To silence echoes calling me!<br/>
            Ghosts drag me further to the deep<br/>
            To a prison of memories and pain<br/>
            <br/>
            A prison of memories and pain<br/>
            <br/>
            The silence sings a hollow tune<br/>
            feeding tides of grief within<br/>
            Ghosts drag me further to the deep<br/>
            to a prison of memories and pain<br/>
            <br/>
            A prison of memories and pain<br/>
            With walls too high to climb<br/>
            Echoes call from times long gone<br/>
            yet still, they haunt my mind<br/>
            <br/>
            The silence sings a hollow tune<br/>
            feeding tides of grief within<br/>
            Ghosts drag me further to the deep...<br/>
            to a prison of memories and pain<br/>
            <br/>
            The silence sings a hollow tune<br/>
            feeding tides of grief within<br/>
            Ghosts drag me further to the deep...<br/>
            to a prison of memories and pain<br/>
            <br/>
            And still, night may call me to the deep...<br/>
            I rise again... in a prison of memories and pain
          </article>

          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="oC8a0tbKaCY"
              title="Hollow"
              lyrics={
                `When I lay my head to rest
Deep whisper calls my name
A hollow voice inside my head
Silent screams, I can't escape

I pray the night to set me free
To silence echoes calling me
Ghosts drag me further to the deep
To a prison of memories and pain

A prison of memories and pain

The silence sings a hollow tune
feeding tides of grief within
Ghosts drag me further to the deep
To a prison of memories and pain

A prison of memories and pain
With walls too high to climb
Echoes call from times long gone
Yet still, they haunt my mind

The silence sings a hollow tune
feeding tides of grief within
Ghosts drag me further to the deep...
to a prison of memories and pain

The silence sings a hollow tune
Feeding tides of grief within
Ghosts drag me further to the deep...
To a prison of memories and pain

And still, night may call me to the deep...
I rise again... in a prison of memories and pain` }
            />
          ) }
        </div>
      );
    }

    case 'you-were-never-there': {
      return (
        <div>
          <h3>You were never there</h3>
          <Authors/>
          <Copy/>
          <article>
            hmmm... hmmm... mmm...<br/>
            <br/>
            I built my castles on broken dreams<br/>
            Learned to walk alone through empty streets<br/>
            In the bottle, you found your peace<br/>
            while your promises were poured too thin<br/>
            <br/>
            I stood alone, just a lonely child<br/>
            Pretending I didn’t care... somehow<br/>
            Still, I kept your pictures close<br/>
            But questions... I ask no more<br/>
            <br/>
            &apos;cause you were never there<br/>
            You were never there<br/>
            <br/>
            No bedtime stories, just broken dreams<br/>
            I cried for you with silent screams<br/>
            You weren’t there when I needed you most<br/>
            Just hollow echoes and empty hope<br/>
            <br/>
            I used to think it might be me<br/>
            Maybe I wasn’t worth your time<br/>
            I learned to live without your love<br/>
            &apos;Cause you were never there<br/>
            <br/>
            Now I’m grown, and I understand...<br/>
            You never tried.... and now it&apos;s too late<br/>
            You wonder why... You wonder why I never call<br/>
            And though I wish you would’ve cared<br/>
            The truth is, you were never there<br/>
            you were never there<br/>
            you were never there<br/>
            <br/>
            I don’t need you to say you&apos;re sorry<br/>
            Your silence said enough<br/>
            I grew to every empty promise<br/>
            I cried... but now I&apos;m done<br/>
            <br/>
            &apos;Cause you were never there<br/>
            You were never there<br/>
            &apos;Cause you were never there<br/>
            You were never there...<br/>
            You were never there...<br/>
            <br/>
            You were never there
          </article>
          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="aRP9bqY-Nl0"
              title="You were never there"
              lyrics={
                `hmmm... hmmm...  mmm...

I built my castles on broken dreams
Learned to walk alone through empty streets
In the bottle, you found your peace
While your promises were poured too thin

I stood alone, just a lonely child
Pretending I didn’t care... somehow
Still, I kept your pictures close
But questions... I ask no more

'cause you were never there
You were never there

No bedtime stories, just broken dreams
I cried for you with silent screams
You weren’t there when I needed you most
Just hollow echoes and empty hope

I used to think it might be me
Maybe I wasn’t worth your time
I learned to live without your love
'Cause you were never there

Now I’m grown, and I understand...
You never tried.... and now it's too late
You wonder why... You wonder why I never call
And though I wish you would’ve cared
The truth is, you were never there
you were never there
you were never there 

I don’t need you to say you're sorry
Your silence said enough
I grew to every empty promise
I cried... but now I'm done

'Cause you were never there
You were never there
'Cause you were never there
You were never there...
You were never there...

You were never there` }
            />
          ) }
        </div>
      );
    }

    case 'paper-dragons': {
      return (
        <div>
          <h3>Paper dragons</h3>
          <Authors/>
          <Copy/>

          <article>
            Paper dragons... high in the sky<br/>
            Children laughing, like all is alright<br/>
            A silly game yet it brings them joy<br/>
            But I stand… in a place I don&apos;t belong<br/>
            <br/>
            For long I walked alone... I chased my dream<br/>
            I held out my hands - with nothing to hold<br/>
            Dreams I had were already gone<br/>
            just another story that remains untold<br/>
            <br/>
            Paper dragons... high in the sky<br/>
            Each a dream that drifted too far<br/>
            Paper dragons... high in the sky<br/>
            Torn to pieces as storms roll by<br/>
            <br/>
            Laughter echoes, soft and far<br/>
            Like dreams fading from beneath the stars<br/>
            A stupid game, another broken toy<br/>
            But somehow, still, it brought them joy<br/>
            <br/>
            I dreamt of more… I dreamt too long<br/>
            Caught in silence, lost in thoughts<br/>
            Now all that&apos;s left is a broken heart<br/>
            Torn to pieces as storms roll by<br/>
            <br/>
            Paper dragons... high in the sky<br/>
            Each one a dream... that drifted too far<br/>
            Some never landed, just faded away<br/>
            Like names, now lost to time<br/>
            <br/>
            Torn to pieces as storms roll by<br/>
            <br/>
            Paper dragons… high in the sky...<br/>
            Torn to pieces as storms roll by<br/>
          </article>
          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="E9v1hRxcp_o"
              title="Paper dragons"
              lyrics={
                `Paper dragons... high in the sky
Children laughing, like all is alright
A silly game yet it brings them joy
But I stand… in a place I don't belong

For long I walked alone... I chased my dream
I held out my hands - with nothing to hold
Dreams I had were already gone
just another story that remains untold

Paper dragons... high in the sky
Each a dream that drifted too far
Paper dragons... high in the sky
Torn to pieces as storms roll by

Laughter echoes, soft and far
Like dreams fading from beneath the stars
A stupid game, another broken toy
But somehow, still, it brought them joy

I dreamt of more… I dreamt too long
Caught in silence, lost in thoughts
Now all that's left is a broken heart
Torn to pieces as storms roll by

Paper dragons... high in the sky
Each one a dream... that drifted too far
Some never landed, just faded away
Like names, now lost to time

Torn to pieces as storms roll by

Paper dragons… high in the sky...
Torn to pieces as storms roll by` }
            />
          ) }
        </div>
      );
    }

    case 'truth-hurts': {
      return (
        <div>
          <h3>Truth hurts</h3>
          <Authors/>
          <Copy/>

          <article>
            I walk alone through empty streets<br/>
            Chasing shadows I&apos;ll never meet<br/>
            I&apos;m losing ground beneath my feet<br/>
            and I scream...<br/>
            Yes, all is fine<br/>
            <br/>
            All is fine<br/>
            <br/>
            I build a world inside my mind<br/>
            Hiding sorrow from the prying eyes<br/>
            Skies turn grey, and nights never end<br/>
            &apos;cause Truth hurts more than lies<br/>
            <br/>
            Truth cuts and lies that heal<br/>
            I hide the pain that makes it real<br/>
            I fake my smile, and I close my eyes<br/>
            &apos;cause ghosts don’t talk when you cry<br/>
            <br/>
            I built a life in an empty space<br/>
            I laughed at the silence... I played my part<br/>
            All is fine, is what I say...<br/>
            &apos;cause Truth hurts more than lies<br/>
            <br/>
            I gave it all... and now, I pretend<br/>
            I choke on words I never said<br/>
            Buried deep behind the smile<br/>
            &apos;cause truth hurts more than lies<br/>
            <br/>
            Yes all is fine<br/>
            <br/>
            Truth cuts and lies that heal<br/>
            I hide the pain that makes it real<br/>
            I fake my smile, and I close my eyes<br/>
            &apos;cause ghosts don’t talk when you cry<br/>
            <br/>
            Truth cuts and lies that heal<br/>
            I hide the pain that makes it real<br/>
            I fake my smile, and I close my eyes<br/>
            &apos;cause ghosts don’t talk when you cry<br/>
            <br/>
            Yes all is fine<br/>
            <br/>
            I gave it all! There&apos;s no way back<br/>
            I hide in dreams I know won’t last<br/>
            I wear a smile made from scars...<br/>
            ...and scream all is fine<br/>
            <br/>
            ...Yes, all is fine...
          </article>

          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="F7_ggxGBkkY"
              title="Truth hurts"
              lyrics={
                `I walk alone through empty streets
Chasing shadows I'll never meet
I'm losing ground beneath my feet
And I scream...
Yes, all is fine!

All is fine!

I build a world inside my mind
Hiding sorrow from the prying eyes
Skies turn grey, and nights never end
'cause truth hurts more than lies!

Truth cuts and lies that heal
I hide the pain that makes it real
I fake my smile, and I close my eyes
'cause ghosts don’t talk when you cry

I built a life in an empty space
I laughed at the silence... I played my part
All is fine, is what I say...
'cause truth hurts more than lies

I gave it all... and now, I pretend
I choke on words I never said
Buried deep behind the smile
'cause truth hurts more than lies

Yes all is fine

Truth cuts and lies that heal
I hide the pain that makes it real
I fake my smile, and I close my eyes
'cause ghosts don’t talk when you cry

Truth cuts and lies that heal
I hide the pain that makes it real
I fake my smile, and I close my eyes
'cause ghosts don’t talk when you cry

Yes all is fine

I gave it all! There's no way back
I hide in dreams I know won’t last
I wear a smile made from scars...
...and scream all is fine

...Yes, all is fine...` }
            />
          ) }
        </div>
      );
    }

    case 'glass-crown': {
      return (
        <div>
          <h3>Glass crown</h3>
          <Authors/>
          <Copy/>

          <article>
            You wore a smile like a mask<br/>
            Built your throne from shattered glass<br/>
            Told the world how right you were<br/>
            A hollow king behind the lies<br/>
            <br/>
            Every story, every boast<br/>
            To you, truth was just a ghost<br/>
            Small deceit in every breath<br/>
            You bled me dry to feel alive<br/>
            <br/>
            You built your kingdom on fear<br/>
            Called it love, then fed on my tears<br/>
            <br/>
            But I see you now! Your glass crown cracked<br/>
            You called it love, a weak king of lies<br/>
            I bled through your games, but now I&apos;m done<br/>
            Your crown is ash<br/>
            And I’m never going back...<br/>
            Never again<br/>
            <br/>
            You’d twist the sun, you’d fake the rain<br/>
            Just to feel big inside your game<br/>
            Everyone was just a pawn<br/>
            You played the game from dusk till dawn<br/>
            <br/>
            You taught me silence - not respect<br/>
            Just how to bow and be afraid<br/>
            Every word, a loaded gun<br/>
            Truth meant nothing unless you won<br/>
            <br/>
            You built your kingdom on fear<br/>
            Called it love, then fed on my tears<br/>
            <br/>
            But I see you now! Your glass crown cracked<br/>
            You called it love, a weak king of lies<br/>
            I bled through your games, but now I&apos;m done<br/>
            Your crown is ash<br/>
            And I’m never going back<br/>
            <br/>
            You were a shadow dressed as a man<br/>
            coward’s hollow eyes... And a heart full of lies!!<br/>
            I won’t carry your weight, won’t bleed for your pride<br/>
            I’m free from your storms - you&apos;ve got nothing left!!<br/>
            <br/>
            But I see you now! Your glass crown cracked<br/>
            You called it love... a weak king of lies<br/>
            I bled through your games, but now I&apos;m done<br/>
            Your crown is ash<br/>
            And I’m never going back<br/>
            <br/>
            And I see you now!! Your glass crown cracked<br/>
            You called it love, but every hit fell like hell<br/>
            Every word... a loaded gun<br/>
            Truth meant nothing unless you won<br/>
            <br/>
            Truth meant nothing unless you won
          </article>

          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="6lIWox__tqA"
              title="Glass crown"
              lyrics={
                `You wore a smile like a mask,
Built your throne from shattered glass.
Told the world how right you were.
A hollow king behind the lies!

Every story, every boast,
To you, truth was just a ghost.
Small deceit in every breath,
You bled me dry to feel alive!

You built your kingdom on fear.
Called it love, then fed on my tears!

But I see you now! Your glass crown cracked.
You called it love, a weak king of lies!
I bled through your games, but now I'm done!
Your crown is ash!
And I’m never going back...
Never again!

You’d twist the sun, you’d fake the rain,
Just to feel big inside your game.
Everyone was just a pawn,
You played the game from dusk till dawn.

You taught me silence - not respect,
Just how to bow and be afraid.
Every word, a loaded gun,
Truth meant nothing unless you won!

You built your kingdom on fear,
Called it love, then fed on my tears!

But I see you now! Your glass crown cracked.
You called it love, a weak king of lies!
I bled through your games, but now I'm done!
Your crown is ash!
And I’m never going back!

You were a shadow dressed as a man,
coward’s hollow eyes... And a heart full of lies!!!
I won’t carry your weight, won’t bleed for your pride,
I’m free from your storms - you've got nothing left!!!

But I see you now! Your glass crown cracked.
You called it love... a weak king of lies!
I bled through your games, but now I'm done!
Your crown is ash!
And I’m never going back.

And I see you now!! Your glass crown cracked.
You called it love, but every hit fell like hell!
Every word... a loaded gun,
Truth meant nothing unless you won!

Truth meant nothing unless you won!
` }
            />
          ) }
        </div>
      );
    }

    case 'echoes-of-your-name': {
      return (
        <div>
          <h3>Echoes of your name</h3>
          <Authors/>
          <Copy/>
          <article>
            I saw you standing in the rain<br/>
            A smile of hope I couldn&apos;t hold<br/>
            Watched petals wilt and fade<br/>
            Then left without a word<br/>
            <br/>
            I shut the door before you knocked<br/>
            Built walls you couldn’t climb<br/>
            You tried to pull me from the edge<br/>
            But I felt safer in the dark<br/>
            <br/>
            You gave me hope, but I let it fade<br/>
            Watched your heart break<br/>
            While I slipped away<br/>
            Now I sleep inside this dream<br/>
            With ghosts of love we had<br/>
            <br/>
            I walk these empty streets<br/>
            Dead gardens where love used to grow<br/>
            Your name echoes in every step<br/>
            I’m still haunted... still alone<br/>
            <br/>
            Old photos - a stranger’s smile<br/>
            Faded love from another time<br/>
            Tried to speak, but words just died<br/>
            Lost in silence - inside this dream<br/>
            <br/>
            I want to say I’m sorry<br/>
            But the moment’s long since gone<br/>
            I talk to you in silence<br/>
            Like you were never gone<br/>
            <br/>
            I walk these empty streets<br/>
            dead gardens where love used to grow<br/>
            Your name echoes in every step<br/>
            I’m still haunted... still alone<br/>
            <br/>
            You gave me hope... but I let it fade<br/>
            Watched your heart break<br/>
            While I slipped away<br/>
            Now I sleep inside this dream<br/>
            With ghosts of love we had<br/>
            <br/>
            You gave me hope... but I let it fade<br/>
            Watched your heart break<br/>
            While I slipped away<br/>
            Now I sleep inside this dream<br/>
            With ghosts of love we had<br/>
            <br/>
            ...With ghosts of love we had
          </article>

          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="U-efk9aVpog"
              title="Echoes of your name"
              lyrics={
                `I saw you standing in the rain
A smile of hope I couldn't hold
Watched petals wilt and fade
Then left without a word

I shut the door before you knocked
Built walls you couldn’t climb
You tried to pull me from the edge
But I felt safer in the dark

You gave me hope, but I let it fade
Watched your heart break
While I slipped away
Now I sleep inside this dream
With ghosts of love we had

I walk these empty streets
Dead gardens where love used to grow
Your name echoes in every step
I’m still haunted... still alone

Old photos - a stranger’s smile
Faded love from another time
Tried to speak, but words just died
Lost in silence - inside this dream

I want to say I’m sorry
But the moment’s long since gone
I talk to you in silence
Like you were never gone

I walk these empty streets
dead gardens where love used to grow
Your name echoes in every step
I’m still haunted... still alone

You gave me hope... but I let it fade
Watched your heart break
While I slipped away
Now I sleep inside this dream
With ghosts of love we had

You gave me hope... but I let it fade
Watched your heart break
While I slipped away
Now I sleep inside this dream
With ghosts of love we had

...With ghosts of love we had` }
            />
          ) }
        </div>
      );
    }

    case 'how-many-more': {
      return (
        <div>
          <h3>How many more</h3>
          <Authors/>
          <Copy/>
          <article>
            You draw lines on paper and in dirt<br/>
            you ignore where the story ends<br/>
            Another name, another face<br/>
            Another young life is lost<br/>
            <br/>
            You scream, you fight<br/>
            Blindfolded by the ancient spite<br/>
            No one wins in this parade<br/>
            Of dead men’s lies you wear with pride<br/>
            <br/>
            In prayer, you raise your hands...<br/>
            Stained by the blood of the innocent<br/>
            <br/>
            Lay down your guns, your sacred lies<br/>
            There&apos;s no glory on the other side<br/>
            We&apos;ve all bled, we&apos;ve been burned<br/>
            What have you ever learned<br/>
            Tear the veil, count the dead<br/>
            tell me how many more<br/>
            <br/>
            You were told they&apos;re not like you<br/>
            fed fear like it was something true<br/>
            Behind the scars and shattered names<br/>
            there&apos;s a voice that hurts the same<br/>
            <br/>
            We bury children, not the lies<br/>
            while leaders watch with hollow eyes<br/>
            The trigger&apos;s quick, but the scars will last<br/>
            we bleed for the ghosts that died in the past<br/>
            <br/>
            You pray with blood-stained hands<br/>
            and never stop to understand<br/>
            The dead don&apos;t care who drew first blood<br/>
            They paid the price.... for your holy lies<br/>
            <br/>
            Lay down your guns, your sacred lies<br/>
            There&apos;s no glory on the other side<br/>
            We&apos;ve all bled, we&apos;ve been burned<br/>
            What have you ever learned<br/>
            Tear the veil, count the dead<br/>
            tell me how many more<br/>
            <br/>
            You pray with blood-stained hands<br/>
            and never stop to understand<br/>
            The dead don&apos;t care who drew first blood<br/>
            They paid the price.... for your holy lies<br/>
            <br/>
            How many more have to die<br/>
            While the damned won&apos;t break the same old spells<br/>
            How many more have to die?<br/>
            <br/>
            Tell me how many more?
          </article>

          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="WMbv_pyw1Q8"
              title="How many more"
              lyrics={
                `You draw lines on paper and in dirt
you ignore where the story ends
Another name, another face
Another young life is lost

You scream, you fight
Blindfolded by the ancient spite
No one wins in this parade
Of dead men’s lies you wear with pride

In prayer, you raise your hands...
Stained by the blood of the innocent

Lay down your guns, your sacred lies
There's no glory on the other side
We've all bled, we've been burned
What have you ever learned
Tear the veil, count the dead
tell me how many more

You were told they're not like you
fed fear like it was something true
Behind the scars and shattered names
there's a voice that hurts the same

We bury children, not the lies
while leaders watch with hollow eyes
The trigger's quick, but the scars will last
we bleed for the ghosts that died in the past

You pray with blood-stained hands
and never stop to understand
The dead don't care who drew first blood
They paid the price.... for your holy lies

Lay down your guns, your sacred lies
There's no glory on the other side
We've all bled, we've been burned
What have you ever learned
Tear the veil, count the dead
tell me how many more

You pray with blood-stained hands
and never stop to understand
The dead don't care who drew first blood
They paid the price.... for your holy lies

How many more have to die
While the damned won't break the same old spells
How many more have to die?

Tell me how many more?
` }
            />
          ) }
        </div>
      );
    }

    case 'footprints': {
      return (
        <div>
          <h3>Footprints</h3>
          <Authors/>
          <Copy/>

          <em className="dedication">For Sergei, whose voice still echoes in our hearts. Safe travels, and
            Godspeed.</em>

          <article>
            Listening to the sounds of the pouring rain<br/>
            Hiding behind a smile, pretending all is fine<br/>
            But deep inside, away from prying eyes<br/>
            Is the lonely soul that cries every night<br/>
            <br/>
            I&apos;ll have to face my ghosts alone tonight<br/>
            Tomorrow&apos;s a bridge unknown... and another lie<br/>
            Memories of yesterday... and days gone by<br/>
            Remind me of what I&apos;ve lost to time<br/>
            <br/>
            Clouds move on, yet sky remains grey<br/>
            Birds fly away, but I&apos;m here to stay<br/>
            Day after day, as memory starts to fade<br/>
            Your footprints are slowly washed away<br/>
            <br/>
            When I close my eyes, you&apos;re back where you belong<br/>
            No one leaves, and I can stay all night long<br/>
            But when I wake up, I’ll never be the same<br/>
            And what matters is not just another game<br/>
            <br/>
            They say time heals, but that’s a lie<br/>
            I still hope i&apos;ll see you smile one more time<br/>
            as the sands of time keep slipping by<br/>
            Your footprints are slowly washed away<br/>
            <br/>
            Clouds move on, yet sky remains grey<br/>
            Birds fly away, but I&apos;m here to stay<br/>
            Day after day... as memory starts to fade<br/>
            Your footprints are slowly washed away<br/>
            <br/>
            Clouds move on, yet sky remains grey<br/>
            Birds fly away, but I&apos;m here to stay<br/>
            Day after day... as memory starts to fade<br/>
            Your footprints are slowly washed away<br/>
            <br/>
            Your footprints are slowly washed away
          </article>

          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="UHkqbq1S1rs"
              title="Footprints"
              lyrics={
                `Listening to the sounds of the pouring rain
Hiding behind a smile, pretending all is fine
But deep inside, away from prying eyes
Is the lonely soul that cries every night

I'll have to face my ghosts alone tonight
Tomorrow's a bridge unknown... and another lie
Memories of yesterday... and days gone by
Remind me of what I've lost to time

Clouds move on, yet sky remains grey
Birds fly away, but I'm here to stay
Day after day, as memory starts to fade
Your footprints are slowly washed away

When I close my eyes, you're back where you belong
No one leaves, and I can stay all night long
But when I wake up, I’ll never be the same
And what matters is not just another game

They say time heals, but that’s a lie
I still hope i'll see you smile one more time
as the sands of time keep slipping by
Your footprints are slowly washed away

Clouds move on, yet sky remains grey
Birds fly away, but I'm here to stay
Day after day... as memory starts to fade
Your footprints are slowly washed away

Clouds move on, yet sky remains grey
Birds fly away, but I'm here to stay
Day after day... as memory starts to fade
Your footprints are slowly washed away

Your footprints are slowly washed away
` }
            />
          ) }
        </div>
      );
    }

    case 'we-will-dance-again': {
      return (
        <div>
          <h3>We will dance again</h3>
          <Authors/>
          <Copy/>
          <article>
            You were a laughter in the pouring rain<br/>
            A star in the midnight sky<br/>
            Torn away when the day went dark<br/>
            the world’s been empty since<br/>
            <br/>
            Silent streets, but your song still plays<br/>
            You&apos;re still here in a thousand ways<br/>
            <br/>
            They stole your breath - but not your name<br/>
            The love we built still lives today<br/>
            Through the fire, storms and rain<br/>
            One day... we will dance again<br/>
            <br/>
            I hear you in the things they never say<br/>
            When voices fade, you’re the one that stays<br/>
            The world moved on like you were never here<br/>
            But I still think of you every day<br/>
            <br/>
            Nothing fills the space you left behind<br/>
            Just memories of days we lost to time<br/>
            Your name’s the only thing that&apos;s real<br/>
            you&apos;re the only reason I live<br/>
            <br/>
            Through the fire and rain<br/>
            we will dance again<br/>
            <br/>
            They stole your breath - but not your name<br/>
            The love we built still lives today<br/>
            I&apos;ll crawl through fire, blood and rain<br/>
            And one day... we will dance again<br/>
            <br/>
            They stole your breath - but not your name<br/>
            The love we built still lives today<br/>
            Through the fire, storms and rain<br/>
            One day... we will dance again<br/>
            We will dance again<br/>
            <br/>
            Through the fire and rain<br/>
            One day... we will dance again<br/>
            <br/>
            We will dance again<br/>
            One day...<br/>
            We will dance again
          </article>

          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="eIF3gkIxHw8"
              title="We will dance again"
              lyrics={
                `You were a laughter in the pouring rain
A star in the midnight sky
Torn away when the day went dark
the world’s been empty since

Silent streets, but your song still plays
You're still here in a thousand ways

They stole your breath - but not your name
The love we built still lives today
Through the fire, storms and rain
One day... we will dance again

I hear you in the things they never say
When voices fade, you’re the one that stays
The world moved on like you were never here
But I still think of you every day

Nothing fills the space you left behind
Just memories of days we lost to time
Your name’s the only thing that's real
you're the only reason I live

Through the fire and rain
we will dance again

They stole your breath - but not your name
The love we built still lives today
I'll crawl through fire, blood and rain
And one day... we will dance again

They stole your breath - but not your name
The love we built still lives today
Through the fire, storms and rain
One day... we will dance again
We will dance again 

Through the fire and rain
One day... we will dance again

We will dance again
One day... 
We will dance again` }
            />
          ) }
        </div>
      );
    }

    case 'tears-of-silence': {
      return (
        <div>
          <h3>Tears of silence</h3>
          <Authors/>
          <Copy/>
          <article>
            I woke up in a room away from home<br/>
            Faded pictures of times long gone<br/>
            Pieces of a world now out of reach<br/>
            Lost in silence... there&apos;s nothing left<br/>
            <br/>
            Face in the mirror - I don&apos;t know<br/>
            Time and silence took their toll<br/>
            Eyes of a stranger lost too long<br/>
            Torn-up wings in a place I don’t belong<br/>
            <br/>
            I don’t scream; I don’t pray<br/>
            No one listens now anyway<br/>
            Fading thoughts, growing pain<br/>
            Regrets of words I couldn’t say<br/>
            <br/>
            Tears of silence leave no trace<br/>
            Only Memories in faded frames<br/>
            No voices left to fill this space<br/>
            You&apos;re an echo in the pain that stays<br/>
            <br/>
            No one listens now anyway<br/>
            <br/>
            The clock keeps ticking, yet nothing moves<br/>
            Silent screams buried in their noise<br/>
            I walk through days that always feel the same<br/>
            Listening for the footsteps that never come<br/>
            <br/>
            I don’t scream, I don’t pray<br/>
            No one listens now anyway<br/>
            Fading thoughts, growing pain<br/>
            Regrets of words I couldn’t say<br/>
            <br/>
            Tears of silence leave no trace<br/>
            Only Memories in faded frames<br/>
            No voices left to fill this space<br/>
            You&apos;re an echo in the pain that stays<br/>
            <br/>
            The world I knew doesn&apos;t know me now<br/>
            just old photos in the faded frames<br/>
            I want to scream, I want to pray<br/>
            But no one listens now anyway<br/>
            <br/>
            Anyway...<br/>
            No one listens now anyway<br/>
            Anyway
          </article>

          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="HWNMC2LyOAo"
              title="Tears of silence"
              lyrics={
                `I woke up in a room away from home
Faded pictures of times long gone
Pieces of a world now out of reach
Lost in silence... there's nothing left

Face in the mirror - I don't know
Time and silence took their toll
Eyes of a stranger lost too long
Torn-up wings in a place I don’t belong

I don’t scream; I don’t pray
No one listens now anyway
Fading thoughts, growing pain
Regrets of words I couldn’t say

Tears of silence leave no trace
Only Memories in faded frames
No voices left to fill this space
You're an echo in the pain that stays

No one listens now anyway

The clock keeps ticking, yet nothing moves
Silent screams buried in their noise
I walk through days that always feel the same
Listening for the footsteps that never come

I don’t scream, I don’t pray,
No one listens now anyway
Fading thoughts, growing pain.
Regrets of words I couldn’t say

Tears of silence leave no trace
Only Memories in faded frames
No voices left to fill this space
You're an echo in the pain that stays

The world I knew doesn't know me now
just old photos in the faded frames
I want to scream, I want to pray
But no one listens now anyway

Anyway...
No one listens now anyway.
Anyway` }
            />
          ) }
        </div>
      );
    }

    case 'monsters-in-the-shadows': {
      return (
        <div>
          <h3>Monsters in the shadows</h3>
          <Authors/>
          <Copy/>
          <article>
            Sitting in the dark alone, the walls are closing in<br/>
            Voices in my head are only whispers of the wind<br/>
            I&apos;m lost in thoughts that never end<br/>
            With memories of moments time erased<br/>
            <br/>
            In the shadows, where the monsters play<br/>
            A flicker in the darkness whispers... calls my name<br/>
            The night twists the truth into a hollow lie<br/>
            Painting the world in dark shades of hell<br/>
            <br/>
            There&apos;s nothing left inside to break<br/>
            nothing left to feel<br/>
            Even pain gave up... it knows the deal<br/>
            <br/>
            No hope, no peace, just the sound of broken dreams<br/>
            Something wicked in the shadows whispers... calls my name<br/>
            I don&apos;t sleep, I don&apos;t hope... I wait for the night to speak<br/>
            With monsters in the shadows... tomorrow never comes<br/>
            <br/>
            Tomorrow never comes<br/>
            <br/>
            I reach for the shadows, but they slip through my hands<br/>
            Like grains of time scattered across the sands<br/>
            The memories still echo in the silence you left<br/>
            And I still chase horizons that I&apos;ll never have<br/>
            <br/>
            I stopped looking for a way back home<br/>
            Stopped pretending I was ever whole<br/>
            I let the monster take me long ago<br/>
            Now there&apos;s nowhere left to go<br/>
            <br/>
            No hope, no peace, just the sound of broken dreams<br/>
            Something wicked in the shadows whispers... calls my name<br/>
            I don&apos;t sleep, I don&apos;t hope... I wait for the night to speak<br/>
            With monsters in the shadows... tomorrow never comes<br/>
            <br/>
            Tomorrow never comes<br/>
            <br/>
            I stopped looking for a way back home<br/>
            Stopped pretending I was ever whole<br/>
            With monsters in the shadows... tomorrow never comes<br/>
            <br/>
            hmmm<br/>
            <br/>
            With monsters in the shadows<br/>
            tomorrow<br/>
            tomorrow never comes
          </article>

          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="lt9jImXrGX4"
              title="Monsters in the shadows"
              lyrics={
                `Sitting in the dark alone, the walls are closing in
Voices in my head are only whispers of the wind
I'm lost in thoughts that never end
With memories of moments time erased

In the shadows, where the monsters play
A flicker in the darkness whispers... calls my name
The night twists the truth into a hollow lie
Painting the world in dark shades of hell

There's nothing left inside to break
nothing left to feel
Even pain gave up... it knows the deal

No hope, no peace, just the sound of broken dreams
Something wicked in shadows whispers... calls my name
I don't sleep, I don't hope... I wait for the night to speak
With monsters in the shadows... tomorrow never comes

Tomorrow never comes

I reach for the shadows, but they slip through my hands
Like grains of time scattered across the sands
The memories still echo in the silence you left
And I still chase horizons that I'll never have

I stopped looking for a way back home
Stopped pretending I was ever whole
I let the monster take me long ago
Now there's nowhere left to go

No hope, no peace, just the sound of broken dreams
Something wicked in shadows whispers... calls my name
I don't sleep, I don't hope... I wait for the night to speak
With monsters in the shadows... tomorrow never comes

Tomorrow never comes

I stopped looking for a way back home
Stopped pretending I was ever whole
With monsters in the shadows... tomorrow never comes

hmmm

With monsters in the shadows
tomorrow
tomorrow never comes` }
            />
          ) }
        </div>
      );
    }

    case 'how-many-more-acoustic': {
      return (
        <div>
          <h3>How many more (acoustic)</h3>
          <Authors/>

          <article>
            You draw lines on paper and in dirt<br/>
            You ignore where the story ends<br/>
            Another name, another face<br/>
            Another young life is lost<br/>
            <br/>
            You scream, you fight<br/>
            Blindfolded by the ancient spite<br/>
            No one wins in this parade<br/>
            Of dead men’s lies you wear with pride<br/>
            <br/>
            In prayer, you raise your hands<br/>
            Stained by the blood of the innocent<br/>
            <br/>
            Lay down your guns, your sacred lies<br/>
            There&apos;s no glory on the other side<br/>
            We&apos;ve all bled, we&apos;ve been burned<br/>
            What have you ever learned<br/>
            Tear the veil, count the dead<br/>
            Tell me how many more<br/>
            <br/>
            You were told they&apos;re not like you<br/>
            Fed fear like it was something true<br/>
            Behind the scars and shattered names<br/>
            There&apos;s a voice that hurts the same<br/>
            <br/>
            We bury children, not the lies<br/>
            While leaders watch with hollow eyes<br/>
            The trigger&apos;s quick, but the scars will last<br/>
            We bleed for the ghosts that died in the past<br/>
            <br/>
            You pray and you raise your hands<br/>
            stained by the blood of the innocent<br/>
            <br/>
            You pray with blood-stained hands<br/>
            and never stop to understand<br/>
            The dead don&apos;t care who drew first blood<br/>
            They paid the price.... for your holy lies<br/>
            <br/>
            Lay down your guns, your sacred lies<br/>
            There&apos;s no glory on the other side<br/>
            We&apos;ve all bled, we&apos;ve been burned<br/>
            What have you ever learned<br/>
            Tear the veil, count the dead<br/>
            tell me how many more<br/>
            <br/>
            How many more have to die<br/>
            While the damned won&apos;t break the same old spells<br/>
            <br/>
            How many more have to die?
          </article>

          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="rhhYGrMwcUg"
              title="How many more? (Acoustic)"
              lyrics={
                `You draw lines on paper and in dirt
You ignore where the story ends
Another name, another face
Another young life is lost

You scream, you fight
Blindfolded by the ancient spite
No one wins in this parade
Of dead men’s lies you wear with pride

In prayer, you raise your hands
Stained by the blood of the innocent

Lay down your guns, your sacred lies
There's no glory on the other side
We've all bled, we've been burned
What have you ever learned
Tear the veil, count the dead
Tell me how many more

You were told they're not like you
Fed fear like it was something true
Behind the scars and shattered names
There's a voice that hurts the same

We bury children, not the lies
While leaders watch with hollow eyes
The trigger's quick, but the scars will last
We bleed for the ghosts that died in the past

You pray and you raise your hands
stained by the blood of the innocent

You pray with blood-stained hands
and never stop to understand
The dead don't care who drew first blood
They paid the price.... for your holy lies

Lay down your guns, your sacred lies
There's no glory on the other side
We've all bled, we've been burned
What have you ever learned
Tear the veil, count the dead
tell me how many more

How many more have to die
While the damned won't break the same old spells

How many more have to die?` }
            />
          ) }
        </div>
      );
    }

    case 'whisper-in-the-storm': {
      return (
        <div>
          <h3>Whisper in the storm</h3>
          <Authors/>
          <Copy/>
          <article>
            Standing on the edge, no one&apos;s around<br/>
            Waves below, a sweet end I dreamed about<br/>
            A gentle whisper inside my head<br/>
            No more sorrow... no regrets<br/>
            <br/>
            I stand alone.... I hold my screams<br/>
            Stuck in the same never-ending dreams<br/>
            I bleed my thoughts I left unsaid<br/>
            Each day paints a new shade of pain<br/>
            <br/>
            Thoughts I bury... thoughts I hide...<br/>
            come tearing through me every night<br/>
            <br/>
            I&apos;m a whisper in the storm<br/>
            Still playing the same old song<br/>
            I hide the pain behind the smile<br/>
            Where the sun never shines<br/>
            A whisper in the storm<br/>
            I’m still here... I&apos;m still here<br/>
            While the world moved on<br/>
            <br/>
            I&apos;ve walked past cliffs, I’ve watched the waves<br/>
            Counted seconds, tested fate<br/>
            I held my breath, I bit my tongue<br/>
            To keep control before the final fall<br/>
            <br/>
            I&apos;m stuck with memories I can’t forget<br/>
            Turning ghosts to words of sorrow and regret<br/>
            Born from the pain... my escape<br/>
            A fight I wage with all I&apos;ve left unsaid<br/>
            <br/>
            I&apos;m a whisper in the storm<br/>
            Still playing the same old song<br/>
            I hide the pain behind the smile<br/>
            Where the sun never shines<br/>
            A whisper in the storm<br/>
            I&apos;m still here... I&apos;m still here<br/>
            While the world moved on<br/>
            <br/>
            I&apos;m a whisper in the storm<br/>
            Still playing the same old song<br/>
            I hide a face behind a smile<br/>
            Where the sun never shines<br/>
            A whisper in the storm<br/>
            I&apos;m still here... I&apos;m still here...<br/>
            While the world moved on<br/>
            <br/>
            ...just a whisper in the storm<br/>
            I&apos;m still here... I&apos;m still here<br/>
            while the world moved on
          </article>

          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="mnWkCATH6-g"
              title="Whisper in the storm"
              lyrics={
                `Standing on the edge, no one's around
Waves below, a sweet end I dreamed about
A gentle whisper inside my head
No more sorrow... no regrets

I stand alone.... I hold my screams
Stuck in the same never-ending dreams
I bleed my thoughts I left unsaid
Each day paints a new shade of pain

Thoughts I bury... thoughts I hide...
come tearing through me every night

I'm a whisper in the storm
Still playing the same old song
I hide the pain behind the smile
Where the sun never shines
A whisper in the storm
I’m still here... I'm still here
While the world moved on

I've walked past cliffs, I’ve watched the waves
Counted seconds, tested fate
I held my breath, I bit my tongue
To keep control before the final fall

I'm stuck with memories I can’t forget
Turning ghosts to words of sorrow and regret
Born from the pain... my escape
A fight I wage with all I've left unsaid

I'm a whisper in the storm
Still playing the same old song
I hide the pain behind the smile
Where the sun never shines
A whisper in the storm
I'm still here... I'm still here 
While the world moved on

I'm a whisper in the storm
Still playing the same old song
I hide a face behind a smile
Where the sun never shines
A whisper in the storm
I'm still here... I'm still here... 
While the world moved on

...just a whisper in the storm
I'm still here... I'm still here
while the world moved on`
              }
            />
          ) }
        </div>
      );
    }

    case 'tomorrow': {
      return (
        <div>
          <h3>Tomorrow</h3>
          <Authors/>
          <Copy/>
          <article>
            Another sleepless night goes by<br/>
            The silence louder than my cries<br/>
            I&apos;m scared of thoughts inside my mind<br/>
            I pray to make it through this night<br/><br/>

            I pretend I know the things I feel<br/>
            I hope that time will help me heal<br/>
            Yet each day is just another lie<br/>
            quiet screams i hold inside<br/><br/>

            If I’m not here tomorrow...<br/>
            Would the world still be the same<br/>
            If all I leave behind is hollow<br/>
            Just words that fade with time<br/>
            Would the sun still rise tomorrow?<br/>
            Would you still say my name<br/>
            If I’m not here tomorrow<br/>
            Would the world still be the same?<br/><br/>

            Another sleepless night goes by<br/>
            I forgot what love is like<br/>
            There’s nothing left that feels like me<br/>
            I&apos;m a ghost of what I used to be<br/>

            Scars many I&apos;ve learned to hide<br/>
            There&apos;s no will left to fight<br/>
            Old memories that never fade<br/>
            Still haunt me to this day<br/><br/>

            I’ve lived a life behind a wall<br/>
            There’s nothing left to say<br/>
            I’ve said enough - let silence speak<br/>
            Some things are better left that way<br/>

            There&apos;s nothing left I need to say<br/>
            No one&apos;s left to hear me now<br/><br/>

            If I&apos;m not here tomorrow<br/>
            Would the world still be the same<br/>
            If all I leave behind is hollow<br/>
            Just words that fade with time<br/>
            Would the sun still rise tomorrow<br/>
            Would you still say my name<br/>
            If I’m not here tomorrow<br/>
            Would the world still be the same?<br/><br/>

            If I&apos;m not here tomorrow<br/>
            Would the world still be the same?<br/>
            Would the world still be the same?<br/><br/>

            If I&apos;m not here tomorrow...<br/>
            Would you still say my name?
          </article>

          { addSchema && (
            <JsonSongSchema
              lyricist="Sebastjan Stadler"
              ytId="jsJzwwZNfuk"
              title="Tomorrow"
              lyrics={
                `Another sleepless night goes by
The silence louder than my cries
I'm scared of thoughts inside my mind
I pray to make it through this night

I pretend I know the things I feel
I hope that time will help me heal
Yet each day is just another lie
quiet screams i hold inside

If I’m not here tomorrow...
Would the world still be the same
If all I leave behind is hollow
Just words that fade with time
Would the sun still rise tomorrow? 
Would you still say my name
If I’m not here tomorrow
Would the world still be the same? 

Another sleepless night goes by
I forgot what love is like
There’s nothing left that feels like me
I'm a ghost of what I used to be

Scars many I've learned to hide
There's no will left to fight
Old memories that never fade
Still haunt me to this day

I’ve lived a life behind a wall
There’s nothing left to say
I’ve said enough - let silence speak,
Some things are better left that way

There's nothing left I need to say
No one's left to hear me now

If I'm not here tomorrow
Would the world still be the same
If all I leave behind is hollow
Just words that fade with time
Would the sun still rise tomorrow
Would you still say my name
If I’m not here tomorrow
Would the world still be the same? 

If I'm not here tomorrow
Would the world still be the same?
Would the world still be the same? 

If I'm not here tomorrow...
Would you still say my name?
` }
            />
          ) }
        </div>
      );
    }

    default:
      return null;
  }
};

export default Songs;
