'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Howl } from 'howler'

const Vitality = ({
  hp,
  name,
  level,
}: {
  hp: number
  name: string
  level: string
}) => {
  const denominator = useMemo(() => hp, [])

  return (
    <div className="w-1/4 min-w-80">
      <div className="border p-6 rounded-3xl shadow">
        <div className="flex justify-between">
          <div className="flex">
            <h2>{name}</h2>
            <p>♂</p>
          </div>
          <p>{`Lv.${level}`}</p>
        </div>

        <div className="flex items-center gap-2">
          <p>HP:</p>
          <div className="h-3 border rounded-full overflow-hidden w-full">
            <div
              className={cn(
                'size-full transition duration-1000 origin-left',
                hp > 50
                  ? 'bg-green-500'
                  : hp > 20
                    ? 'bg-yellow-500'
                    : 'bg-red-500',
              )}
              style={{ transform: `scaleX(${hp / denominator})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const sound = new Howl({
  src: ['/smallKick.mp3'],
  html5: true,
})
sound.volume(0.2)

export default function Home() {
  const [hp, setHp] = useState(200)
  const [enemyHp, setEnemyHp] = useState(100)
  const [isOpenSkillCard, setIsOpenSkillCard] = useState(false)
  const [message, setMessage] = useState('どうする？')

  const attack = (attackPoint: number, target: 'player' | 'enemy') => {
    if (target === 'enemy') {
      setEnemyHp((oldHp) => Math.max(oldHp - attackPoint, 0))
    }
    if (target === 'player') {
      setHp((oldHp) => Math.max(oldHp - attackPoint, 0))
    }
  }

  const win = enemyHp === 0

  const skills = [
    {
      name: '10万ボルト',
      attackPoint: 60,
    },
    {
      name: 'でんこうせっか',
      attackPoint: 30,
    },
    {
      name: 'アイアンテール',
      attackPoint: 40,
    },
    {
      name: 'ボルテッカー',
      attackPoint: 100,
    },
  ]

  return (
    <div className="container py-20 px-80">
      <div className="flex justify-between items-center mb-20">
        <Vitality hp={enemyHp} name="ピカチュウ" level="50" />
        <div className="flex flex-col justify-center">
          <Image
            className={cn(
              'ml-16 transition-all duration-500 -mb-5 z-10',
              win ? 'translate-y-10 opacity-0 delay-500' : '',
            )}
            src="/neko.png"
            width={160}
            height={80}
            alt="野生のピカチュウ"
          />
          <div
            className={cn(
              'border h-10 ml-10 rounded-full',
              win ? 'translate-y-10 opacity-0 delay-500' : '',
            )}
          />
        </div>
      </div>
      <div className="flex justify-between items-end mb-5">
        <div className="flex flex-col justify-center">
          <Image
            className="ml-8 -mb-5 z-10"
            src="/neko.png"
            width={160}
            height={80}
            alt="自分のピカチュウ"
          />
          <div className="border h-10 rounded-full" />
        </div>
        <Vitality hp={hp} name="ピカチュウ" level="60" />
      </div>
      <div className="relative flex justify-between gap-3">
        <div className="border rounded-3xl p-3 w-full shadow whitespace-pre-line">
          {win ? 'やせいの　ピカチュウは　たおれた！' : message}
        </div>
        {isOpenSkillCard && (
          <div className="absolute left-2 flex flex-col justify-between border rounded-3xl p-6 h-60 w-48 -mt-32 bg-white z-20">
            {skills.map((skill) => (
              <Button
                key={skill.name}
                variant="ghost"
                onClick={() => {
                  attack(skill.attackPoint, 'player')
                  sound.play()
                  setMessage(`ピカチュウの\n${skill.name}!`)
                  attack(
                    skills[Math.floor(Math.random() * 3)].attackPoint,
                    'enemy',
                  )
                  setIsOpenSkillCard(false)
                }}
              >
                {skill.name}
              </Button>
            ))}
          </div>
        )}

        <div className="border rounded-3xl p-3 shadow grid grid-cols-2 gap-2">
          <Button
            variant="ghost"
            onClick={() => {
              setMessage('')
              setIsOpenSkillCard(true)
            }}
          >
            たたかう
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setIsOpenSkillCard(false)
              setMessage('バッグが空だ！')
            }}
          >
            バッグ
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setIsOpenSkillCard(false)
              setMessage('手持ちのポケモンがいない')
            }}
          >
            ポケモン
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setIsOpenSkillCard(false)
              setMessage('今は逃げられない')
            }}
          >
            逃げる
          </Button>
        </div>
      </div>
    </div>
  )
}
