---
title: How to Deal with Traffic Surges in Distributed Systems
author: Anant Chowdhary
authorURL: https://www.freecodecamp.org/news/author/anant/
originalURL: https://www.freecodecamp.org/news/how-to-deal-with-traffic-surges-in-distributed-systems/
translator: ""
reviewer: ""
---

May 17, 2024 / [#Distributed Systems][1]

<!-- more -->

# How to Deal with Traffic Surges in Distributed Systems

![Anant Chowdhary](https://www.freecodecamp.org/news/content/images/size/w60/2024/03/1568701858162.jpeg)

[Anant Chowdhary][2]

  ![How to Deal with Traffic Surges in Distributed Systems](https://www.freecodecamp.org/news/content/images/size/w2000/2024/05/pixlr-image-generator-69edc004-3fbf-4324-92e0-bb7bc998b82d-1.png)

Web and Distributed Systems can often get overwhelmed with traffic.

What leads to systems being overwhelmed, why does it happen, and what are some common strategies we can use to deal with this? We'll answer these questions in this article.

## Table of Contents

1.  [What is traffic in the context of distributed systems][3]?
2.  [Why can traffic surges be problematic?][4]
3.  [Ways to deal with high traffic loads][5]
4.  [Exponential Backoff and Retries][6]
5.  [Summary][7]

## What is Traffic in the Context of Distributed Systems?

Traffic in distributed systems generally refers to the exchange of data between end users and the entry point to a system that may rely on distributed components.

The patterns of traffic a system sees usually informs multiple design decisions since it impacts performance, scalability and reliability of a system.

## Why Can Traffic Surges be Problematic?

Traffic surges can often cripple systems that aren’t equipped to deal with them.

You may have come across instances of social media services such as Instagram or TikTok being down. In some cases, this may be due to surges of traffic.

Here are some common problems a surge in traffic may cause:

1.  **Congestion**: As traffic increases, network congestion may increase. This may in some cases, lead to packet loss, increased latency and impact performance of systems.
2.  **Imbalanced load**: Not all distributed systems balance load well. A sudden spike in traffic may lead to failures in particular sub-systems. As an example, let’s think of a celebrity’s tweets being stored on a shard. In the scenario where an event leads to millions of people accessing the celebrity’s tweets, the shard that stores the celebrity’s tweets may get overwhelmed.
3.  **Cascading failures**: Imagine a set of domninoes that are placed right next to each other. One domino falling may lead to the entire set of dominoes falling. Distributed systems are similar. If components aren't loosely coupled, a single point of failure may lead to cascading failures. It is therefore important to consider cascading failures when designing distributed systems with high traffic loads in mind.

## Ways to Deal with High Traffic Loads

No system is immune to failure under an unspecified amount of traffic.

Fortunately, there are some design decisions you can take to ameliorate the problems discussed above, and make systems more resilient against failure when they see a sudden spike in traffic.

Now, let's cover some of the commonly used solutions that can help deal with surges in traffic.

Firstly, horizontal scaling is generally the process of adding resources to a system by adding more resources in parallel. For instance, adding more servers or adding more CDN nodes.

In effect, it is adding more resources instead of increasing the capacity of a single node in the network.

Distributing traffic across servers can lead to improved performance, lower latency, and improved response times in general.

Next, load balancing can sometimes be closely linked with horizontal scaling. However, load balancing by itself also can be very useful in situations where we see a sudden surge in traffic.

Load balancers can smartly route requests to servers so that traffic is well balanced across systems, and doesn't overwhelm one particular system.

In addition, caching can dramatically reduce the need for traffic (requests) to go all the way to a server for fulfilment.  Some types of requests, such as those that access static content as great candidates for caching.

Similar to an example that we discussed in the above sections, let's assume that there's a sudden spike in people viewing a celebrity's tweets. The static content on the page, such as the celebrity's display picture, can be easily cached. This will prevent a request that goes all the way to the profile picture database, and therefore may help prevent read failures, and in turn cascading failures.

Lastly, consider a scenario where a client internal to a distributed system sends a request to the server and the request fails. Clients often retry requests, but this may lead to cascading retries.

This is a scenario where multiple clients (the original one, and the one downstream) may be retrying their requests, and as a result, a system downstream may be inundated with requests and that by itself may lead to cascaded failures.

![CascadingRetries.drawio](https://www.freecodecamp.org/news/content/images/2024/05/CascadingRetries.drawio.png)

A single retry request can lead to an exponential number of retries in other parts of a distributed system

In the figure above, we can see that two requests from the server (one retry in the event of a failure at the Queue), leads to :

1) Four Requests from the serverless component to the Notification Topic (two requests to the serverless component and two retries)

2) Eight Requests from the Notification Topic to the Queue (four requests to the queue, four retries).

Even a single failure at the end component (the Queue in this case), led to an exponential number of retry requests to it.

A common antidote to this problem is to use exponential backoff while retrying requests.

## Exponential Backoff and Retries

Exponential backoff, as the name suggests, refers to introducing a delay before the next attempt instead of immediately retrying. We increase the delay time exponentially with each attempt.

For instance, the first retry might wait for one second, the second retry waits for two seconds, the third for four seconds, and so on.

Note that since a retry attempt isn't made immediately, the probability of cascading retries goes down compared to if retries were made immediately.

Here's some code that illustrates exponential backoff in action :

```python

def exponential_backoff_retry(url, max_retries=5, initial_delay=1, backoff_factor=2):
    retry_count = 0
    while retry_count < max_retries:
        try:
            response = requests.get(url)
            # Check if the response was successful (status code 2xx)
            if response.status_code // 100 == 2:
                return response
            # If not successful, raise an exception to trigger a retry
            response.raise_for_status()
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
            # Calculate the exponential backoff delay
            delay = initial_delay * (backoff_factor ** retry_count)
            print(f"Retrying in {delay} seconds...")
            time.sleep(delay)
            retry_count += 1
    # If max retries reached, raise an exception
    raise RuntimeError(f"Failed to fetch {url} after {max_retries} retries")
```

The code above retries HTTP GET requests using an exponential backoff strategy.

Inside the while loop, we make attempts to make the request and check if the response is successful (successful HTTP requests have a status code of 2xx).

Note that if the request fails, we raise an exception and retry the request after calculating an exponential delay.

This process is continued until either a request succeeds or the maximum number of retries is reached. If the maximum retries are exhausted without success, we raise a `RuntimeError`.

## Summary

To summarize, we delved into the significance of traffic within distributed systems, emphasizing its influence on system performance and resilience.

We looked at the complications arising from traffic surges, including network congestion, load imbalances, and cascading failures, which can render systems vulnerable to collapse.

To address these challenges, we looked at some strategic measures such as horizontal scaling, load balancing, caching, and retry strategies. Particularly, we looked at the effectiveness of exponential backoff in mitigating cascading retries, thereby enhancing system robustness.

By keeping in mind some of these solutions, systems can better manage sudden spikes in traffic, ensuring sustained functionality and minimizing potential downtime, ultimately bolstering overall system reliability.

These are just a few of the numerous methods that are used industry wide to deal with surges in traffic.

---

![Anant Chowdhary](https://www.freecodecamp.org/news/content/images/size/w60/2024/03/1568701858162.jpeg)

[Anant Chowdhary][8]

Software Engineer

---

If this article was helpful, share it.

Learn to code for free. freeCodeCamp's open source curriculum has helped more than 40,000 people get jobs as developers. [Get started][9]

[1]: /news/tag/distributed-systems/
[2]: /news/author/anant/
[3]: #what-is-traffic-in-the-context-of-distributed-systems
[4]: #why-can-traffic-surges-be-problematic
[5]: #ways-to-deal-with-high-traffic-loads
[6]: #exponential-backoff-and-retries
[7]: #summary
[8]: /news/author/anant/
[9]: https://www.freecodecamp.org/learn/