import { type Repository } from "@/types"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { calculateMostStarredRepos } from "@/utils"

const PopularRepos = ({ repositories }: { repositories: Repository[] }) => {
  const popularRepos = calculateMostStarredRepos(repositories)
  if (popularRepos.length === 0) {
    return <></>
  }
  const chartConfig = {
    repo: {
      label: "Repository",
      color: "#e11c47", // Red color for the bars
    },
  } satisfies ChartConfig

  return (
    <div>
      <h2 className='text-2xl font-semibold text-center mb-4'>
        Most Starred Repositories
      </h2>
      <ChartContainer config={chartConfig} className='h-100 w-full'>
        <BarChart accessibilityLayer data={popularRepos}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='repo'
            tickLine={false}
            tickMargin={10}
            tickFormatter={(value) => value.slice(0, 10)}
          />
          <YAxis dataKey='stars' allowDecimals={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey='stars' fill='var(--color-repo)' radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default PopularRepos
