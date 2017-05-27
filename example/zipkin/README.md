## zipkin初体验之Node.js

一、zipkin是什么
    zipkin是一个开放源代码分布式的跟踪系统，由Twitter公司开源，它致力于收集服务的定时数据，以解决微服务架构中的延迟问题，包括数据的收集、存储、查找和展现。它
的理论模型来自于Google Dapper 论文。
    每个服务向zipkin报告计时数据，zipkin会根据调用关系通过Zipkin UI生成依赖关系图，显示了多少跟踪请求通过每个服务，该系统让开发者可通过一个 Web 前端轻松的收
集和分析数据，例如用户每次请求服务的处理时间等，可方便的监测系统中存在的瓶颈。

二、什么需要分布式跟踪系统（zipkin）
    当代的互联网的服务，通常都是用复杂的、大规模分布式集群来实现的。特别是随着微服务架构和容器技术的兴起（加速企业敏捷，快速适应业务变化，满足架构的高可用和高
扩展），互联网应用往往构建在不同的服务之上，这些服务，有可能是由不同的团队开发、可能使用不同的编程语言来实现、有可能布在了几千台服务器，横跨多个不同的数据中心。因此，就需要一些可以帮助理解系统行为、用于快速分析性能问题的工具。先是Google开发其分布式跟踪系统并且发表了Dapper论文，然后由Twitter参照Dapper论文设计思想开发zipkin分布式跟踪系统，同时开源出来。
    zipkin通过采集跟踪数据可以帮助开发者深入了解在分布式系统中某一个特定的请求时如何执行的。假如说，我们现在有一个用户请求超时，我们就可以将这个超时的请求调用
链展示在UI当中。我们可以很快度的定位到导致响应很慢的服务究竟是什么。如果对这个服务细节也很很清晰，那么我们还可以定位是服务中的哪个问题导致超时。同时，通过服务调用链路能够快速定位系统的性能瓶颈。

三、zipkin的架构与核心概念

 将数据发送到zipkin的已检测应用程序中的组件称为Reporter。它通过几种传输
方式之一将跟踪数据发送到zipkin收集器，zipkin收集器将跟踪数据保存到存储器。稍后，存储由API查询以向UI提供数据。为了保证服务的调用链路跟踪，zipkin使用传输ID，例如，当正在进行跟踪操作并且它需要发出传出http请求时，会添加一些headers信息以传播ID，但它不能用于发送详细信息（操作名称、数据等）。其架构图如下所示：

<img width="972" alt="zipkin screen shot" src="http://img.blog.csdn.net/20161221165312512?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjEzODcxNzE=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center">

A、Span
    基本工作单元，一次链路调用创建一个span，通过一个64位ID标识它，span通过还有其他的数据，例如描述信息，时间戳，key-value对的(Annotation)tag信息，
parent-id等,其中parent-id 可以表示span调用链路来源，通俗的理解span就是一次请求信息。

B、 Trace
    类似于树结构的Span集合，表示一条调用链路，存在唯一标识。

C、 Annotation
    注解,用来记录请求特定事件相关信息(例如时间)，通常包含四个注解信息：
        （1）cs – ClientStart,表示客户端发起请求
        （2）sr – Server Receive,表示服务端收到请求
        （3）ss – Server Send,表示服务端完成处理，并将结果发送给客户端
        （4）cr – Client Received,表示客户端获取到服务端返回信息
D、 Transport
    收集被trace的services的spans，并且传输给zipkin的collector，有三个主要传输：HTTP，Kafka和Scribe。

E、 Collector
    zipkincollector会对一个到来的被trace的数据（span）进行验证、存储并设置索引。

F、 Storage
    存储，zipkin默认的存储方式为in-memory，即不会进行持久化操作。如果想进行收集数据的持久化，可以存储数据在Cassandra，因为Cassandra是可扩展的，有一个灵活的
模式，并且在Twitter中被大量使用，我们使这个组件可插入。除了Cassandra，我们原生支持ElasticSearch和MySQL。其他后端可能作为第三方扩展提供。

G、QueryService
    一旦数据被存储和索引，我们需要一种方法来提取它。查询守护程序提供了一个用于查找和检索跟踪的简单JSON API，此API的主要使用者是WebUI。

H、 WebUI
    展示页面，提供了一个漂亮的界面来查看痕迹。 Web UI提供了一种基于服务，时间和注释查看trace的方法（通过Query Service）。注意：在UI中没有内置的身份验证。

以上摘抄（http://codecloud.net/127236.html）







